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

export const playAudio = (text: string, lang: string = "en-US") => {
  const vol = getVoiceVolume();
  if (vol <= 0) return;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.volume = vol;
    window.speechSynthesis.speak(utterance);
  }
};

export const normalizeText = (s: string) =>
  s
    .toLowerCase()
    .trim()
    // Remove punctuation and special characters, keep letters, numbers and spaces
    .replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
};
