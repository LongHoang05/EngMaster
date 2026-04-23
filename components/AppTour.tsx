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

  // Logic điều hướng Tour
  const handleJoyrideCallback = (data: EventData) => {
    const { action, index, status, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      localStorage.setItem("eng_master_tour_completed", "true");
      return;
    }

    // Chỉ xử lý khi bước hoàn thành (người dùng nhấn nút)
    if (type === EVENTS.STEP_AFTER) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      // ===== TIẾN (NEXT) =====
      if (action === ACTIONS.NEXT) {
        if (index === 0) {
          // Bước 1 -> 2: Chuyển sang tab Tài liệu
          setActiveTab("topics");
          setTimeout(() => setStepIndex(nextStepIndex), 1000);
        }
        else if (index === 2) {
          // Bước 3 -> 4: Mở chi tiết chủ đề
          if (onOpenFirstTopic) onOpenFirstTopic();
          else {
            const el = document.querySelector('.tour-topic-item') as HTMLElement;
            if (el) el.click();
          }
          setTimeout(() => setStepIndex(nextStepIndex), 800);
        }
        else if (index === 3) {
          // Bước 4 -> 5: Mở Flashcard
          const el = document.querySelector('.tour-flashcard-btn') as HTMLElement;
          if (el) el.click();
          setTimeout(() => setStepIndex(nextStepIndex), 800);
        }
        else if (index === 4) {
          // Bước 5 -> 6: Thoát Flashcard
          const el = document.querySelector('.tour-flashcard-back-btn') as HTMLElement;
          if (el) el.click();
          setTimeout(() => setStepIndex(nextStepIndex), 500);
        }
        else if (index === 5) {
          // Bước 6 -> 7: Demo nhập từ vựng
          const input = document.querySelector('.tour-add-vocab-input') as HTMLInputElement;
          if (input) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
            setter?.call(input, 'phenomenon');
            input.dispatchEvent(new Event('input', { bubbles: true }));
            setTimeout(() => {
              const suggestion = document.querySelector('.tour-suggestion-item') as HTMLElement;
              if (suggestion) suggestion.click();
              setTimeout(() => setStepIndex(nextStepIndex), 1500);
            }, 1000);
          } else {
            setStepIndex(nextStepIndex);
          }
        }
        else if (index === 6) {
          // Bước 7 -> 8: Đóng từ điển, sang tab Kiểm tra
          const el = document.querySelector('.tour-dict-close-btn') as HTMLElement;
          if (el) el.click();
          setActiveTab("quiz");
          setTimeout(() => setStepIndex(nextStepIndex), 800);
        }
        else if (index === 7) {
          // Bước 8 -> 9: Chọn chủ đề quiz và vào cấu hình
          const topic = document.querySelector('.tour-quiz-topic-item') as HTMLElement;
          if (topic) topic.click();
          setTimeout(() => {
            const btn = document.querySelector('.tour-quiz-continue-btn') as HTMLElement;
            if (btn) btn.click();
            setTimeout(() => setStepIndex(nextStepIndex), 600);
          }, 300);
        }
        else if (index === 8) {
          // Bước 9 -> 10: Sang Dashboard để gợi ý bật thông báo
          setActiveTab("dashboard");
          setTimeout(() => setStepIndex(nextStepIndex), 1000);
        }
        else {
          // Các bước khác chuyển bình thường
          setStepIndex(nextStepIndex);
        }
      }

      // ===== LÙI (PREV) =====
      else if (action === ACTIONS.PREV) {
        if (index === 9) {
          // Bước 10 -> 9: Quay lại Quiz config
          isTransitioning.current = true;
          setActiveTab("quiz");

          // Phase 1: Đợi topic item xuất hiện rồi click chọn
          const waitForTopic = setInterval(() => {
            // Nếu đã ở config rồi thì xong luôn
            if (document.querySelector('.tour-quiz-method-select')) {
              clearInterval(waitForTopic);
              isTransitioning.current = false;
              setStepIndex(nextStepIndex);
              return;
            }
            const topic = document.querySelector('.tour-quiz-topic-item') as HTMLElement;
            if (topic) {
              clearInterval(waitForTopic);
              topic.click();

              // Phase 2: Đợi nút "Tiếp tục" được bật (không disabled) rồi click
              setTimeout(() => {
                const waitForBtn = setInterval(() => {
                  const btn = document.querySelector('.tour-quiz-continue-btn') as HTMLButtonElement;
                  if (btn && !btn.disabled) {
                    clearInterval(waitForBtn);
                    btn.click();

                    // Phase 3: Đợi màn hình config xuất hiện rồi chuyển step
                    const waitForConfig = setInterval(() => {
                      if (document.querySelector('.tour-quiz-method-select')) {
                        clearInterval(waitForConfig);
                        isTransitioning.current = false;
                        setStepIndex(nextStepIndex);
                      }
                    }, 200);
                    // Timeout safety cho phase 3
                    setTimeout(() => {
                      clearInterval(waitForConfig);
                      isTransitioning.current = false;
                      setStepIndex(nextStepIndex);
                    }, 3000);
                  }
                }, 200);
                // Timeout safety cho phase 2
                setTimeout(() => {
                  clearInterval(waitForBtn);
                  isTransitioning.current = false;
                }, 5000);
              }, 300);
            }
          }, 300);
          // Timeout safety cho phase 1
          setTimeout(() => {
            clearInterval(waitForTopic);
            isTransitioning.current = false;
          }, 8000);
        }
        else if (index === 8) {
          // Bước 9 -> 8: Quay lại danh sách quiz
          const el = document.querySelector('.tour-quiz-back-btn') as HTMLElement;
          if (el) el.click();
          setTimeout(() => setStepIndex(nextStepIndex), 500);
        }
        else if (index === 7) {
          // Bước 8 -> 7: Quay lại Topics và mở từ điển
          setActiveTab("topics");
          setTimeout(() => {
            const el = document.querySelector('.tour-topic-item') as HTMLElement;
            if (el) el.click();
            
            setTimeout(() => {
              // Trigger lại việc nhập từ để hiện dict result
              const input = document.querySelector('.tour-add-vocab-input') as HTMLInputElement;
              if (input) {
                const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
                setter?.call(input, 'phenomenon');
                input.dispatchEvent(new Event('input', { bubbles: true }));
                setTimeout(() => {
                  const suggestion = document.querySelector('.tour-suggestion-item') as HTMLElement;
                  if (suggestion) suggestion.click();
                  setTimeout(() => setStepIndex(nextStepIndex), 1000);
                }, 1000);
              } else {
                setStepIndex(nextStepIndex);
              }
            }, 800);
          }, 500);
        }
        else if (index === 6) {
          // Bước 7 -> 6: Quay lại nhập từ (Đóng từ điển)
          const el = document.querySelector('.tour-dict-close-btn') as HTMLElement;
          if (el) el.click();
          setTimeout(() => setStepIndex(nextStepIndex), 500);
        }
        else if (index === 5) {
          // Bước 6 -> 5: Quay lại Flashcard
          const el = document.querySelector('.tour-flashcard-btn') as HTMLElement;
          if (el) el.click();
          setTimeout(() => setStepIndex(nextStepIndex), 800);
        }
        else if (index === 4) {
          // Bước 5 -> 4: Quay lại Topic detail (Đóng Flashcard)
          const el = document.querySelector('.tour-flashcard-back-btn') as HTMLElement;
          if (el) el.click();
          setTimeout(() => setStepIndex(nextStepIndex), 500);
        }
        else if (index === 3) {
          // Bước 4 -> 3: Quay lại danh sách chủ đề
          if (onBackToList) onBackToList();
          else {
            const el = document.querySelector('.tour-topic-back-btn') as HTMLElement;
            if (el) el.click();
          }
          setTimeout(() => setStepIndex(nextStepIndex), 500);
        }
        else {
          setStepIndex(nextStepIndex);
        }
      }
    }

    // Nếu không tìm thấy target, đợi rồi thử lại (không nhảy bước)
    // Nhưng KHÔNG thử lại nếu đang trong quá trình chuyển đổi async
    if (type === EVENTS.TARGET_NOT_FOUND && !isTransitioning.current) {
      setTimeout(() => {
        setStepIndex(index);
      }, 500);
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
