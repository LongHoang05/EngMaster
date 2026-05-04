"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Step, EventData, STATUS, ACTIONS, EVENTS } from "react-joyride";

const Joyride = dynamic(
  () => import("react-joyride").then((mod) => mod.Joyride),
  { ssr: false }
);

interface AppTourProps {
  setActiveTab: (tab: "dashboard" | "topics" | "quiz") => void;
  onOpenFirstTopic?: () => void;
  onBackToList?: () => void;
}

export default function AppTour({ setActiveTab, onOpenFirstTopic, onBackToList }: AppTourProps) {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const isTransitioning = useRef(false);

  // Khóa cuộn trang khi tour đang chạy
  useEffect(() => {
    if (run) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [run]);

  // Kiểm tra trạng thái hoàn thành tour
  useEffect(() => {
    const hasCompletedTour = localStorage.getItem("eng_master_tour_completed");
    if (!hasCompletedTour) {
      setTimeout(() => {
        setRun(true);
      }, 1000);
    }
  }, []);

  // Polling utility để chờ DOM element xuất hiện, an toàn và ổn định hơn setTimeout
  const waitForElement = (selector: string, timeout = 8000): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
      const check = () => document.querySelector(selector) as HTMLElement;
      const initial = check();
      if (initial) return resolve(initial);

      const interval = setInterval(() => {
        const el = check();
        if (el) {
          clearInterval(interval);
          resolve(el);
        }
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        reject(new Error(`Timeout waiting for ${selector}`));
      }, timeout);
    });
  };

  // Logic điều hướng Tour
  const handleJoyrideCallback = async (data: EventData) => {
    const { action, index, status, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      localStorage.setItem("eng_master_tour_completed", "true");
      return;
    }

    // Nếu không tìm thấy target, đợi rồi thử lại
    if (type === EVENTS.TARGET_NOT_FOUND && !isTransitioning.current) {
      setTimeout(() => setStepIndex(index), 500);
      return;
    }

    // Chỉ xử lý khi bước hoàn thành (người dùng nhấn nút)
    if (type === EVENTS.STEP_AFTER) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      if (isTransitioning.current) return;
      isTransitioning.current = true;

      try {
        if (action === ACTIONS.NEXT) {
          if (index === 0) {
            setActiveTab("topics");
            await waitForElement('.tour-action-buttons');
          } else if (index === 2) {
            if (onOpenFirstTopic) onOpenFirstTopic();
            else {
              const el = await waitForElement('.tour-topic-item');
              el.click();
            }
            await waitForElement('.tour-flashcard-btn');
          } else if (index === 3) {
            const el = await waitForElement('.tour-flashcard-btn');
            el.click();
            await waitForElement('.tour-flashcard-play-area');
          } else if (index === 4) {
            const el = await waitForElement('.tour-flashcard-back-btn');
            el.click();
            await waitForElement('.tour-add-vocab-input');
          } else if (index === 5) {
            const input = await waitForElement('.tour-add-vocab-input') as HTMLInputElement;
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
            setter?.call(input, 'phenomenon');
            input.dispatchEvent(new Event('input', { bubbles: true }));
            
            const suggestion = await waitForElement('.tour-suggestion-item');
            suggestion.click();
            await waitForElement('.tour-dict-result');
          } else if (index === 6) {
            const el = await waitForElement('.tour-dict-close-btn');
            el.click();
            setActiveTab("quiz");
            await waitForElement('.tour-tab-quiz');
          } else if (index === 7) {
            const topic = await waitForElement('.tour-quiz-topic-item');
            topic.click();
            const btn = await waitForElement('.tour-quiz-continue-btn:not([disabled])');
            btn.click();
            await waitForElement('.tour-quiz-method-select');
          } else if (index === 8) {
            setActiveTab("dashboard");
            await waitForElement('.tour-notif-banner');
          }
        } else if (action === ACTIONS.PREV) {
          if (index === 9) {
            setActiveTab("quiz");
            try {
              await waitForElement('.tour-quiz-method-select', 500);
            } catch {
              const topic = await waitForElement('.tour-quiz-topic-item');
              topic.click();
              const btn = await waitForElement('.tour-quiz-continue-btn:not([disabled])');
              btn.click();
              await waitForElement('.tour-quiz-method-select');
            }
          } else if (index === 8) {
            const el = await waitForElement('.tour-quiz-back-btn');
            el.click();
            await waitForElement('.tour-quiz-topic-item');
          } else if (index === 7) {
            setActiveTab("topics");
            const el = await waitForElement('.tour-topic-item');
            el.click();
            
            const input = await waitForElement('.tour-add-vocab-input') as HTMLInputElement;
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
            setter?.call(input, 'phenomenon');
            input.dispatchEvent(new Event('input', { bubbles: true }));
            
            const suggestion = await waitForElement('.tour-suggestion-item');
            suggestion.click();
            await waitForElement('.tour-dict-result');
          } else if (index === 6) {
            const el = await waitForElement('.tour-dict-close-btn');
            el.click();
            await waitForElement('.tour-add-vocab-input');
          } else if (index === 5) {
            const el = await waitForElement('.tour-flashcard-btn');
            el.click();
            await waitForElement('.tour-flashcard-play-area');
          } else if (index === 4) {
            const el = await waitForElement('.tour-flashcard-back-btn');
            el.click();
            await waitForElement('.tour-flashcard-btn');
          } else if (index === 3) {
            if (onBackToList) onBackToList();
            else {
              const el = await waitForElement('.tour-topic-back-btn');
              if (el) el.click();
            }
            await waitForElement('.tour-topic-item');
          }
        }
        
        setStepIndex(nextStepIndex);
      } catch (err) {
        console.error("Tour transition error:", err);
        // Cứ tiếp tục chuyển bước để tour không bị kẹt hoàn toàn
        setStepIndex(nextStepIndex);
      } finally {
        isTransitioning.current = false;
      }
    }
  };

  const steps: Step[] = [
    {
      target: ".tour-tab-topics",
      content: "Đây là tab Tài liệu, nơi lưu trữ và quản lý toàn bộ chủ đề từ vựng của bạn.",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: ".tour-action-buttons",
      content: "Tại đây, bạn có thể tạo chủ đề mới thủ công, hoặc nhập/xuất từ vựng hàng loạt cực kỳ nhanh chóng bằng file Excel.",
      placement: "bottom",
      skipBeacon: true,
      skipScroll: true,
    },
    {
      target: ".tour-topic-item",
      content: "Hãy nhấp vào một chủ đề bất kỳ để xem danh sách từ vựng chi tiết và thêm từ mới.",
      placement: "bottom",
      skipBeacon: true,
      skipScroll: true,
    },
    {
      target: ".tour-flashcard-btn",
      content: "Nhấn vào nút Học Flashcards để bắt đầu bài ôn tập từ vựng.",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: ".tour-flashcard-play-area",
      content: "Đây là khu vực học Flashcard! Các từ vựng sẽ hiển thị dưới dạng thẻ lật. Bạn có thể vuốt thẻ hoặc bấm nút để tự kiểm tra trí nhớ. Hệ thống áp dụng Lặp lại ngắt quãng (Spaced Repetition) để tự động tính toán thời gian ôn tập tối ưu cho từng từ.",
      placement: "bottom",
      skipBeacon: true,
      skipScroll: true,
    },
    {
      target: ".tour-add-vocab-input",
      content: "Để Thêm từ mới vào chủ đề, bạn chỉ cần gõ tiếng Anh vào đây và nhấn Enter.",
      placement: "bottom",
      skipBeacon: true,
      skipScroll: true,
    },
    {
      target: ".tour-dict-result",
      content: "Kết quả tra cứu sẽ hiện ra ngay lập tức kèm theo phát âm chuẩn, từ loại, định nghĩa tiếng Việt và ví dụ. Rất tiện lợi đúng không nào?",
      placement: "bottom",
      skipBeacon: true,
      skipScroll: true,
    },
    {
      target: ".tour-tab-quiz",
      content: "Sau khi học xong, hãy vào tab Kiểm tra mỗi ngày để làm bài test và duy trì chuỗi học (streak) bùng cháy nhé!",
      placement: "bottom",
      skipBeacon: true,
    },
    {
      target: ".tour-quiz-method-select",
      content: "Tại đây bạn có thể cấu hình phương thức kiểm tra như Trắc nghiệm, Gõ từ, hoặc Luyện nghe. Đa dạng hình thức giúp bạn phát triển toàn diện các kỹ năng!",
      placement: "bottom",
      skipBeacon: true,
      skipScroll: true,
    },
    {
      target: ".tour-notif-banner",
      content: "Mẹo nhỏ: Hãy bật thông báo để nhận câu hỏi ôn tập tự động mỗi tiếng. Đây là cách tốt nhất để biến việc học thành thói quen mà không cần nỗ lực!",
      placement: "bottom",
      skipBeacon: true,
      skipScroll: false,
    },
    {
      target: ".tour-leaderboard",
      content: "Cuối cùng, theo dõi thống kê trí nhớ và vị trí của bạn trên Bảng vàng thi đua tại đây. Chúc bạn học tốt!",
      placement: "top",
      skipBeacon: true,
      skipScroll: false,
    }
  ];

  if (!run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showSkipButton={true}
      onEvent={handleJoyrideCallback}
      options={{
        primaryColor: '#4f46e5',
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        overlayClickAction: false,
        blockTargetInteraction: true,
        showProgress: true,
        scrollOffset: 150,
        zIndex: 10000,
        textColor: '#1e293b',
        backgroundColor: '#ffffff',
      }}
      styles={{
        tooltip: {
          maxWidth: '85vw',
          padding: '16px',
          borderRadius: '16px',
          fontSize: '14px',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonPrimary: {
          borderRadius: '8px',
          fontWeight: 'bold',
          padding: '8px 16px',
        },
        buttonBack: {
          marginRight: 10,
          color: '#64748b',
        },
        buttonSkip: {
          color: '#94a3b8',
        },
        buttonClose: {
          display: 'none',
        },
      }}
      locale={{
        back: 'Quay lại',
        close: 'Đóng',
        last: 'Hoàn thành',
        next: 'Tiếp tục',
        skip: 'Bỏ qua',
      }}
    />
  );
}
