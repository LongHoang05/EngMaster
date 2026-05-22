// Masking user_code for privacy (abc***)
export function maskUserCode(code: string | null): string {
  if (!code) return "Anonymous";
  if (code.length <= 3) return code;
  return code.slice(0, 3) + "***";
}

export const ADMIN_CODE = "lhg";


let globalAudioContext: AudioContext | null = null;
const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!globalAudioContext) {
    const AudioContextClass = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext) as typeof AudioContext;
    if (AudioContextClass) {
      globalAudioContext = new AudioContextClass();
    }
  }
  return globalAudioContext;
};

// Sound and Voice Settings
const getSoundVolume = () => {
  if (typeof window === "undefined") return 0.7;
  if (localStorage.getItem("setting_sound_effects") === "off") return 0;
  const vol = localStorage.getItem("setting_sound_volume");
  return vol ? parseFloat(vol) : 0.7;
};

const getVoiceVolume = () => {
  if (typeof window === "undefined") return 1.0;
  if (localStorage.getItem("setting_voice") === "off") return 0;
  const vol = localStorage.getItem("setting_voice_volume");
  return vol ? parseFloat(vol) : 1.0;
};

// Play success sound using Web Audio API
export const playSuccessSound = () => {
  try {
    const vol = getSoundVolume();
    if (vol <= 0) return;

    const ctx = getAudioContext();
    if (!ctx) return;
    
    const play = () => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      const t = ctx.currentTime;
      osc.frequency.setValueAtTime(880, t); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.1); // A6

      gainNode.gain.setValueAtTime(0, t);
      gainNode.gain.linearRampToValueAtTime(vol, t + 0.05); // Volume
      gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.5);
    };

    if (ctx.state === "suspended") {
      ctx.resume().then(play);
    } else {
      play();
    }
  } catch (e) {
    console.error(e);
  }
};

export const playFailSound = () => {
  try {
    const vol = getSoundVolume();
    if (vol <= 0) return;

    const ctx = getAudioContext();
    if (!ctx) return;
    
    const play = () => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "triangle";
      const t = ctx.currentTime;
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.2);

      gainNode.gain.setValueAtTime(0, t);
      gainNode.gain.linearRampToValueAtTime(vol, t + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.3);
    };

    if (ctx.state === "suspended") {
      ctx.resume().then(play);
    } else {
      play();
    }
  } catch (e) {
    console.error(e);
  }
};

export const playAudio = (text: string) => {
  const vol = getVoiceVolume();
  if (vol <= 0) return;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.volume = vol;
    window.speechSynthesis.speak(utterance);
  }
};

export const normalizeText = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9àáạảãâăèéẹẻẽêìíịỉĩòóọỏõôơùúụủũưỳýỵỷỹđ ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
