export interface MovieSubtitle {
  id: number;
  startTime: number;
  endTime: number;
  en_text: string;
  vi_text: string;
  ipa: string;
}

export interface Episode {
  id: string;
  title: string;
  youtubeId: string;
  subtitles: MovieSubtitle[];
}

export interface Series {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  avatarUrl: string;
  level: "Dễ" | "Trung bình" | "Khó";
  episodes: Episode[];
}

export const MOCK_SERIES: Series[] = [
  {
    id: "s1",
    title: "Peppa Pig (Heo Peppa)",
    description: "Series phim hoạt hình nổi tiếng dành cho trẻ em, giúp luyện nghe từ vựng đời sống siêu cơ bản. Tốc độ nói chậm, rõ chữ, giọng Anh-Anh.",
    thumbnailUrl: "https://i.ytimg.com/vi/XLKgLlB3PkE/maxresdefault.jpg",
    avatarUrl: "https://i.ytimg.com/vi/XLKgLlB3PkE/default.jpg",
    level: "Dễ",
    episodes: [
  {
    "id": "ep_1",
    "title": "Tập 1 (Auto Generated)",
    "youtubeId": "mgsozLXKG8c",
    "subtitles": [
      {
        "id": 1,
        "startTime": 1.07,
        "endTime": 3.1,
        "en_text": "(Peppa): Cruise Ship Holiday!",
        "vi_text": "(Peppa): Kỳ nghỉ trên du thuyền!",
        "ipa": "/(peppa*): kruz ʃɪp ˈhɑlɪˌdeɪ!/"
      },
      {
        "id": 2,
        "startTime": 3.1,
        "endTime": 5.0,
        "en_text": "(narrator): Today, Peppa and George",
        "vi_text": "(người kể chuyện): Hôm nay, Peppa và George",
        "ipa": "/(ˈnɛreɪtər): təˈdeɪ, peppa* ənd ʤɔrʤ/"
      },
      {
        "id": 3,
        "startTime": 5.0,
        "endTime": 9.07,
        "en_text": "are going on holiday with Granny and Grandpa Pig!",
        "vi_text": "đang đi nghỉ với bà nội và ông nội lợn!",
        "ipa": "/ər goʊɪŋ ɔn ˈhɑlɪˌdeɪ wɪθ ˈgræni ənd ˈgrændˌpɑ pɪg!/"
      },
      {
        "id": 4,
        "startTime": 9.07,
        "endTime": 13.15,
        "en_text": "- Will you be okay without Peppa and George for a short while?",
        "vi_text": "- Bạn có ổn không nếu không có Peppa và George một thời gian ngắn?",
        "ipa": "/ wɪl ju bi ˌoʊˈkeɪ wɪˈθaʊt peppa* ənd ʤɔrʤ fər ə ʃɔrt waɪl?/"
      },
      {
        "id": 5,
        "startTime": 13.15,
        "endTime": 15.32,
        "en_text": "(giggling) - Yes, I think we'll manage.",
        "vi_text": "(cười khúc khích) - Vâng, tôi nghĩ chúng ta sẽ xoay sở được.",
        "ipa": "/(ˈgɪgəlɪŋ)  jɛs, aɪ θɪŋk wɪl ˈmænɪʤ./"
      },
      {
        "id": 6,
        "startTime": 15.31,
        "endTime": 18.52,
        "en_text": "- Bye-bye, Goldie. I will miss you!",
        "vi_text": "- Tạm biệt, Goldie. Tôi sẽ nhớ bạn!",
        "ipa": "/ ˈbaɪˈbaɪ, ˈgoʊldi. aɪ wɪl mɪs ju!/"
      },
      {
        "id": 7,
        "startTime": 19.22,
        "endTime": 21.09,
        "en_text": "- Have a lovely holiday!",
        "vi_text": "- Chúc bạn có một kỳ nghỉ lễ vui vẻ!",
        "ipa": "/ hæv ə ˈləvli ˈhɑlɪˌdeɪ!/"
      },
      {
        "id": 8,
        "startTime": 21.09,
        "endTime": 23.82,
        "en_text": "- And don't forget to call us on the phone!",
        "vi_text": "- Và đừng quên gọi điện cho chúng tôi nhé!",
        "ipa": "/ ənd doʊnt fərˈgɛt tɪ kɔl ˈjuˈɛs ɔn ðə foʊn!/"
      },
      {
        "id": 9,
        "startTime": 23.82,
        "endTime": 25.19,
        "en_text": "- Bye-bye! - Bye!",
        "vi_text": "- Tạm biệt! - Tạm biệt!",
        "ipa": "/ ˈbaɪˈbaɪ!  baɪ!/"
      },
      {
        "id": 10,
        "startTime": 25.19,
        "endTime": 26.56,
        "en_text": "(Peppa): Bye-bye!",
        "vi_text": "(Peppa): Tạm biệt!",
        "ipa": "/(peppa*): ˈbaɪˈbaɪ!/"
      },
      {
        "id": 11,
        "startTime": 26.56,
        "endTime": 28.96,
        "en_text": "Where are we going, Granny?",
        "vi_text": "Chúng ta đang đi đâu vậy, bà nội?",
        "ipa": "/wɛr ər wi goʊɪŋ, ˈgræni?/"
      },
      {
        "id": 12,
        "startTime": 28.96,
        "endTime": 31.66,
        "en_text": "- We're going on a cruise!",
        "vi_text": "- Chúng ta đang đi du thuyền!",
        "ipa": "/ wɪr goʊɪŋ ɔn ə kruz!/"
      },
      {
        "id": 13,
        "startTime": 31.66,
        "endTime": 34.0,
        "en_text": "- Ooh! What is a cruise?",
        "vi_text": "- Ồ! Một hành trình là gì?",
        "ipa": "/ u! wət ɪz ə kruz?/"
      },
      {
        "id": 14,
        "startTime": 34.0,
        "endTime": 36.77,
        "en_text": "- It's a holiday on a big boat!",
        "vi_text": "- Đó là một kỳ nghỉ trên một chiếc thuyền lớn!",
        "ipa": "/ ɪts ə ˈhɑlɪˌdeɪ ɔn ə bɪg boʊt!/"
      },
      {
        "id": 15,
        "startTime": 36.77,
        "endTime": 38.71,
        "en_text": "- Like your boat, Grandpa?",
        "vi_text": "- Giống như chiếc thuyền của ông hả, ông nội?",
        "ipa": "/ laɪk jʊr boʊt, ˈgrændˌpɑ?/"
      },
      {
        "id": 16,
        "startTime": 38.7,
        "endTime": 41.64,
        "en_text": "- Yes, but a bit bigger.",
        "vi_text": "- Ừ, nhưng lớn hơn một chút.",
        "ipa": "/ jɛs, bət ə bɪt ˈbɪgər./"
      },
      {
        "id": 17,
        "startTime": 42.14,
        "endTime": 45.21,
        "en_text": "The cruise ship should be here somewhere.",
        "vi_text": "Con tàu du lịch lẽ ra phải ở đâu đó ở đây.",
        "ipa": "/ðə kruz ʃɪp ʃʊd bi hir ˈsəmˌwɛr./"
      },
      {
        "id": 18,
        "startTime": 45.21,
        "endTime": 47.25,
        "en_text": "- It's there, Grandpa!",
        "vi_text": "- Nó ở đó, ông nội!",
        "ipa": "/ ɪts ðɛr, ˈgrændˌpɑ!/"
      },
      {
        "id": 19,
        "startTime": 47.25,
        "endTime": 50.85,
        "en_text": "- I say! What a big boat!",
        "vi_text": "- Tôi nói! Thật là một chiếc thuyền lớn!",
        "ipa": "/ aɪ seɪ! wət ə bɪg boʊt!/"
      },
      {
        "id": 20,
        "startTime": 50.85,
        "endTime": 54.25,
        "en_text": "(narrator): The cruise ship is a very big boat.",
        "vi_text": "(người kể chuyện): Tàu du lịch là một chiếc thuyền rất lớn.",
        "ipa": "/(ˈnɛreɪtər): ðə kruz ʃɪp ɪz ə ˈvɛri bɪg boʊt./"
      },
      {
        "id": 21,
        "startTime": 54.25,
        "endTime": 55.95,
        "en_text": "- All aboard!",
        "vi_text": "- Tất cả lên tàu!",
        "ipa": "/ ɔl əˈbɔrd!/"
      },
      {
        "id": 22,
        "startTime": 59.19,
        "endTime": 60.76,
        "en_text": "(dinging)",
        "vi_text": "(đinh)",
        "ipa": "/(dinging*)/"
      },
      {
        "id": 23,
        "startTime": 62.76,
        "endTime": 65.03,
        "en_text": "- Welcome aboard the Sunny Ocean,",
        "vi_text": "- Chào mừng lên tàu Sunny Ocean,",
        "ipa": "/ ˈwɛlkəm əˈbɔrd ðə ˈsəni ˈoʊʃən,/"
      },
      {
        "id": 24,
        "startTime": 65.03,
        "endTime": 67.13,
        "en_text": "our solar-powered cruise ship!",
        "vi_text": "tàu du lịch chạy bằng năng lượng mặt trời của chúng tôi!",
        "ipa": "/ɑr solar-powered* kruz ʃɪp!/"
      },
      {
        "id": 25,
        "startTime": 67.13,
        "endTime": 69.0,
        "en_text": "(Grandpa Pig): Unbelievable!",
        "vi_text": "(Ông Heo): Không thể tin được!",
        "ipa": "/(ˈgrændˌpɑ pɪg): ˌənbəˈlivəbəl!/"
      },
      {
        "id": 26,
        "startTime": 69.0,
        "endTime": 70.87,
        "en_text": "- May I see your tickets?",
        "vi_text": "- Tôi có thể xem vé của bạn được không?",
        "ipa": "/ meɪ aɪ si jʊr ˈtɪkɪts?/"
      },
      {
        "id": 27,
        "startTime": 70.87,
        "endTime": 73.31,
        "en_text": "Thank you. I am Captain Otter.",
        "vi_text": "Cảm ơn. Tôi là thuyền trưởng Otter.",
        "ipa": "/θæŋk ju. aɪ æm ˈkæptən ˈɑtər./"
      },
      {
        "id": 28,
        "startTime": 73.31,
        "endTime": 74.77,
        "en_text": "Enjoy your holiday!",
        "vi_text": "Hãy tận hưởng kỳ nghỉ của bạn!",
        "ipa": "/ˌɛnˈʤɔɪ jʊr ˈhɑlɪˌdeɪ!/"
      },
      {
        "id": 29,
        "startTime": 74.77,
        "endTime": 76.91,
        "en_text": "- Please follow me to your cabin.",
        "vi_text": "- Xin hãy theo tôi đến cabin của bạn.",
        "ipa": "/ pliz ˈfɑloʊ mi tɪ jʊr ˈkæbən./"
      },
      {
        "id": 30,
        "startTime": 76.91,
        "endTime": 79.71,
        "en_text": "(narrator): A cabin is a bedroom on a ship.",
        "vi_text": "(người kể chuyện): Cabin là phòng ngủ trên một con tàu.",
        "ipa": "/(ˈnɛreɪtər): ə ˈkæbən ɪz ə ˈbɛˌdrum ɔn ə ʃɪp./"
      },
      {
        "id": 31,
        "startTime": 79.71,
        "endTime": 82.22,
        "en_text": "- Ooh! A big bed,",
        "vi_text": "- Ồ! Một chiếc giường lớn,",
        "ipa": "/ u! ə bɪg bɛd,/"
      },
      {
        "id": 32,
        "startTime": 82.22,
        "endTime": 83.88,
        "en_text": "little beds,",
        "vi_text": "những chiếc giường nhỏ,",
        "ipa": "/ˈlɪtəl bɛdz,/"
      },
      {
        "id": 33,
        "startTime": 83.88,
        "endTime": 85.28,
        "en_text": "television!",
        "vi_text": "tivi!",
        "ipa": "/ˈtɛləˌvɪʒən!/"
      },
      {
        "id": 34,
        "startTime": 85.28,
        "endTime": 86.95,
        "en_text": "- How civilised!",
        "vi_text": "- Thật là văn minh!",
        "ipa": "/ haʊ civilised*!/"
      },
      {
        "id": 35,
        "startTime": 86.95,
        "endTime": 89.02,
        "en_text": "- And we can see the sea!",
        "vi_text": "- Và chúng ta có thể nhìn thấy biển!",
        "ipa": "/ ənd wi kən si ðə si!/"
      },
      {
        "id": 36,
        "startTime": 89.02,
        "endTime": 91.09,
        "en_text": "(giggling)",
        "vi_text": "(cười khúc khích)",
        "ipa": "/(ˈgɪgəlɪŋ)/"
      },
      {
        "id": 37,
        "startTime": 91.09,
        "endTime": 92.19,
        "en_text": "(gull squawking)",
        "vi_text": "(mòng biển kêu quang quác)",
        "ipa": "/(gəl skˈwɔkɪŋ)/"
      },
      {
        "id": 38,
        "startTime": 92.19,
        "endTime": 93.06,
        "en_text": "(sighing)",
        "vi_text": "(thở dài)",
        "ipa": "/(saɪɪŋ)/"
      },
      {
        "id": 39,
        "startTime": 93.06,
        "endTime": 94.96,
        "en_text": "- Oh, it's so nice",
        "vi_text": "- Ôi đẹp quá",
        "ipa": "/ oʊ, ɪts soʊ nis/"
      },
      {
        "id": 40,
        "startTime": 94.96,
        "endTime": 97.1,
        "en_text": "to get away from everything.",
        "vi_text": "để thoát khỏi mọi thứ.",
        "ipa": "/tɪ gɪt əˈweɪ frəm ˈɛvriˌθɪŋ./"
      },
      {
        "id": 41,
        "startTime": 97.1,
        "endTime": 98.6,
        "en_text": "- Grandpa Pig!",
        "vi_text": "- Ông nội lợn!",
        "ipa": "/ ˈgrændˌpɑ pɪg!/"
      },
      {
        "id": 42,
        "startTime": 98.6,
        "endTime": 102.0,
        "en_text": "- Oh, haha! Fancy seeing you here!",
        "vi_text": "- Ồ, hahaha! Thật vui khi được gặp bạn ở đây!",
        "ipa": "/ oʊ, haha*! ˈfænsi siɪŋ ju hir!/"
      },
      {
        "id": 43,
        "startTime": 102.0,
        "endTime": 104.6,
        "en_text": "(narrator): It is Mr. Stallion and Mrs. Corgi!",
        "vi_text": "(người kể chuyện): Đó là ông Stallion và bà Corgi!",
        "ipa": "/(ˈnɛreɪtər): ɪt ɪz ˈmɪstər. ˈstæljən ənd ˈmɪsɪz. ˈkɔrgi!/"
      },
      {
        "id": 44,
        "startTime": 104.6,
        "endTime": 107.01,
        "en_text": "- Yes... What luck.",
        "vi_text": "- Vâng... Thật may mắn.",
        "ipa": "/ jɛs... wət lək./"
      },
      {
        "id": 45,
        "startTime": 107.01,
        "endTime": 108.37,
        "en_text": "Peppa and George,",
        "vi_text": "Peppa và George,",
        "ipa": "/peppa* ənd ʤɔrʤ,/"
      },
      {
        "id": 46,
        "startTime": 108.37,
        "endTime": 111.41,
        "en_text": "maybe it's time we explored the ship?",
        "vi_text": "có lẽ đã đến lúc chúng ta khám phá con tàu?",
        "ipa": "/ˈmeɪbi ɪts taɪm wi ɪkˈsplɔrd ðə ʃɪp?/"
      },
      {
        "id": 47,
        "startTime": 111.41,
        "endTime": 113.35,
        "en_text": "- Okay, then! Au revoir!",
        "vi_text": "- Được rồi! Xin chào!",
        "ipa": "/ ˌoʊˈkeɪ, ðɛn! oʊ rɪvˈwɑr!/"
      },
      {
        "id": 48,
        "startTime": 113.35,
        "endTime": 114.61,
        "en_text": "- Toodle pip!",
        "vi_text": "- Toodle pip!",
        "ipa": "/ toodle* pɪp!/"
      },
      {
        "id": 49,
        "startTime": 115.11,
        "endTime": 117.02,
        "en_text": "(boat horn honking)",
        "vi_text": "(tiếng còi thuyền)",
        "ipa": "/(boʊt hɔrn ˈhɔŋkɪŋ)/"
      },
      {
        "id": 50,
        "startTime": 118.08,
        "endTime": 121.62,
        "en_text": "(narrator): Peppa and George are exploring the cruise ship.",
        "vi_text": "(người kể chuyện): Peppa và George đang khám phá con tàu du lịch.",
        "ipa": "/(ˈnɛreɪtər): peppa* ənd ʤɔrʤ ər ɪkˈsplɔrɪŋ ðə kruz ʃɪp./"
      },
      {
        "id": 51,
        "startTime": 121.62,
        "endTime": 123.22,
        "en_text": "- I wonder what we will find.",
        "vi_text": "- Tôi tự hỏi chúng ta sẽ tìm thấy gì.",
        "ipa": "/ aɪ ˈwəndər wət wi wɪl faɪnd./"
      },
      {
        "id": 52,
        "startTime": 123.22,
        "endTime": 124.62,
        "en_text": "(giggling)",
        "vi_text": "(cười khúc khích)",
        "ipa": "/(ˈgɪgəlɪŋ)/"
      },
      {
        "id": 53,
        "startTime": 124.62,
        "endTime": 126.96,
        "en_text": "(narrator): George has found a paddling pool.",
        "vi_text": "(người kể chuyện): George đã tìm thấy một bể bơi có mái chèo.",
        "ipa": "/(ˈnɛreɪtər): ʤɔrʤ həz faʊnd ə ˈpædəlɪŋ pul./"
      },
      {
        "id": 54,
        "startTime": 126.96,
        "endTime": 129.93,
        "en_text": "(George snorts) - You can't paddle now, George,",
        "vi_text": "(George khịt mũi) - Bây giờ anh không thể chèo thuyền được, George,",
        "ipa": "/(ʤɔrʤ snɔrts)  ju kænt ˈpædəl naʊ, ʤɔrʤ,/"
      },
      {
        "id": 55,
        "startTime": 129.93,
        "endTime": 131.9,
        "en_text": "we are exploring!",
        "vi_text": "chúng tôi đang khám phá!",
        "ipa": "/wi ər ɪkˈsplɔrɪŋ!/"
      },
      {
        "id": 56,
        "startTime": 131.9,
        "endTime": 133.07,
        "en_text": "- Oh!",
        "vi_text": "- Ồ!",
        "ipa": "/ oʊ!/"
      },
      {
        "id": 57,
        "startTime": 133.07,
        "endTime": 134.9,
        "en_text": "- I can stay here with George. (snorts)",
        "vi_text": "- Tôi có thể ở lại đây với George. (khịt mũi)",
        "ipa": "/ aɪ kən steɪ hir wɪθ ʤɔrʤ. (snɔrts)/"
      },
      {
        "id": 58,
        "startTime": 134.9,
        "endTime": 136.97,
        "en_text": "- Oh, goodie! (George giggles)",
        "vi_text": "- Ồ, tốt quá! (George cười khúc khích)",
        "ipa": "/ oʊ, ˈgʊdi! (ʤɔrʤ ˈgɪgəlz)/"
      },
      {
        "id": 59,
        "startTime": 136.97,
        "endTime": 139.24,
        "en_text": "Which way now, Grandpa?",
        "vi_text": "Đường nào bây giờ, ông nội?",
        "ipa": "/wɪʧ weɪ naʊ, ˈgrændˌpɑ?/"
      },
      {
        "id": 60,
        "startTime": 139.24,
        "endTime": 141.37,
        "en_text": "- Let's just keep walking.",
        "vi_text": "- Chúng ta cứ đi bộ thôi.",
        "ipa": "/ lɛts ʤɪst kip ˈwɔkɪŋ./"
      },
      {
        "id": 61,
        "startTime": 141.37,
        "endTime": 144.91,
        "en_text": "I say! A jungle café!",
        "vi_text": "Tôi nói! Một quán cà phê rừng!",
        "ipa": "/aɪ seɪ! ə ˈʤəŋgəl café*é!/"
      },
      {
        "id": 62,
        "startTime": 144.91,
        "endTime": 147.18,
        "en_text": "A video game room!",
        "vi_text": "Một phòng trò chơi điện tử!",
        "ipa": "/ə ˈvɪdioʊ geɪm rum!/"
      },
      {
        "id": 63,
        "startTime": 147.18,
        "endTime": 148.92,
        "en_text": "A cinema!",
        "vi_text": "Một rạp chiếu phim!",
        "ipa": "/ə ˈsɪnəmə!/"
      },
      {
        "id": 64,
        "startTime": 148.91,
        "endTime": 150.35,
        "en_text": "(gasps) - And a lift!",
        "vi_text": "(thở hổn hển) - Và thang máy!",
        "ipa": "/(gæsps)  ənd ə lɪft!/"
      },
      {
        "id": 65,
        "startTime": 150.35,
        "endTime": 153.09,
        "en_text": "- This boat has everything!",
        "vi_text": "- Chiếc thuyền này có mọi thứ!",
        "ipa": "/ ðɪs boʊt həz ˈɛvriˌθɪŋ!/"
      },
      {
        "id": 66,
        "startTime": 153.82,
        "endTime": 154.72,
        "en_text": "(dinging)",
        "vi_text": "(đinh)",
        "ipa": "/(dinging*)/"
      },
      {
        "id": 67,
        "startTime": 154.72,
        "endTime": 156.76,
        "en_text": "- Hooray! Soft play!",
        "vi_text": "- Hoan hô! Chơi mềm!",
        "ipa": "/ hʊˈreɪ! sɔft pleɪ!/"
      },
      {
        "id": 68,
        "startTime": 156.76,
        "endTime": 159.12,
        "en_text": "(narrator): Peppa loves soft play.",
        "vi_text": "(người kể chuyện): Peppa thích chơi đùa nhẹ nhàng.",
        "ipa": "/(ˈnɛreɪtər): peppa* ləvz sɔft pleɪ./"
      },
      {
        "id": 69,
        "startTime": 159.12,
        "endTime": 161.29,
        "en_text": "- Wee! (giggling)",
        "vi_text": "- Ối! (cười khúc khích)",
        "ipa": "/ wi! (ˈgɪgəlɪŋ)/"
      },
      {
        "id": 70,
        "startTime": 161.29,
        "endTime": 163.83,
        "en_text": "- Hello! I'm Rohan Rhino!",
        "vi_text": "- Xin chào! Tôi là Rohan Rhino!",
        "ipa": "/ hɛˈloʊ! əm roʊən ˈraɪˌnoʊ!/"
      },
      {
        "id": 71,
        "startTime": 163.83,
        "endTime": 165.37,
        "en_text": "- I'm Peppa Pig!",
        "vi_text": "- Tôi là Peppa Pig!",
        "ipa": "/ əm peppa* pɪg!/"
      },
      {
        "id": 72,
        "startTime": 165.37,
        "endTime": 168.27,
        "en_text": "- Have you ever been on a big boat before?",
        "vi_text": "- Bạn đã từng đi trên một chiếc thuyền lớn chưa?",
        "ipa": "/ hæv ju ˈɛvər bɪn ɔn ə bɪg boʊt ˌbiˈfɔr?/"
      },
      {
        "id": 73,
        "startTime": 168.27,
        "endTime": 170.94,
        "en_text": "- I've never been on a boat this big!",
        "vi_text": "- Tôi chưa bao giờ được đi trên một chiếc thuyền lớn thế này!",
        "ipa": "/ aɪv ˈnɛvər bɪn ɔn ə boʊt ðɪs bɪg!/"
      },
      {
        "id": 74,
        "startTime": 170.94,
        "endTime": 174.44,
        "en_text": "- Peppa, I think we should be getting back now.",
        "vi_text": "- Peppa, tôi nghĩ chúng ta nên quay lại ngay bây giờ.",
        "ipa": "/ peppa*, aɪ θɪŋk wi ʃʊd bi ˈgɪtɪŋ bæk naʊ./"
      },
      {
        "id": 75,
        "startTime": 174.44,
        "endTime": 177.01,
        "en_text": "- Okay, Grandpa. Bye, Rohan!",
        "vi_text": "- Được rồi, ông nội. Tạm biệt, Rohan!",
        "ipa": "/ ˌoʊˈkeɪ, ˈgrændˌpɑ. baɪ, roʊən!/"
      },
      {
        "id": 76,
        "startTime": 177.01,
        "endTime": 178.68,
        "en_text": "- See you tomorrow!",
        "vi_text": "- Hẹn gặp lại vào ngày mai!",
        "ipa": "/ si ju təˈmɑˌroʊ!/"
      },
      {
        "id": 77,
        "startTime": 178.68,
        "endTime": 181.75,
        "en_text": "- We will just go back the way we came.",
        "vi_text": "- Chúng ta sẽ quay lại con đường chúng ta đã đến.",
        "ipa": "/ wi wɪl ʤɪst goʊ bæk ðə weɪ wi keɪm./"
      },
      {
        "id": 78,
        "startTime": 182.08,
        "endTime": 183.72,
        "en_text": "Oh. - Bookshop?",
        "vi_text": "Ồ. - Hiệu sách à?",
        "ipa": "/oʊ.  ˈbʊkˌʃɑp?/"
      },
      {
        "id": 79,
        "startTime": 183.72,
        "endTime": 185.22,
        "en_text": "- Space café?",
        "vi_text": "- Quán cà phê không gian?",
        "ipa": "/ speɪs café*é?/"
      },
      {
        "id": 80,
        "startTime": 185.22,
        "endTime": 187.49,
        "en_text": "This is not the way.",
        "vi_text": "Đây không phải là cách.",
        "ipa": "/ðɪs ɪz nɑt ðə weɪ./"
      },
      {
        "id": 81,
        "startTime": 187.49,
        "endTime": 189.42,
        "en_text": "(gulls squawking)",
        "vi_text": "(mòng biển kêu quang quác)",
        "ipa": "/(gəlz skˈwɔkɪŋ)/"
      },
      {
        "id": 82,
        "startTime": 189.42,
        "endTime": 191.86,
        "en_text": "- I wonder where Peppa and Grandpa Pig have got to.",
        "vi_text": "- Không biết Peppa và ông nội lợn đã đi đâu rồi.",
        "ipa": "/ aɪ ˈwəndər wɛr peppa* ənd ˈgrændˌpɑ pɪg hæv gɑt tɪ./"
      },
      {
        "id": 83,
        "startTime": 191.86,
        "endTime": 193.39,
        "en_text": "(George snorts) Come on, George.",
        "vi_text": "(George khịt mũi) Thôi nào, George.",
        "ipa": "/(ʤɔrʤ snɔrts) kəm ɔn, ʤɔrʤ./"
      },
      {
        "id": 84,
        "startTime": 193.39,
        "endTime": 194.86,
        "en_text": "(snorts) Let's wait for them",
        "vi_text": "(khịt mũi) Hãy đợi họ nhé",
        "ipa": "/(snɔrts) lɛts weɪt fər ðɛm/"
      },
      {
        "id": 85,
        "startTime": 194.86,
        "endTime": 195.89,
        "en_text": "back at the cabin.",
        "vi_text": "quay lại cabin.",
        "ipa": "/bæk æt ðə ˈkæbən./"
      },
      {
        "id": 86,
        "startTime": 195.9,
        "endTime": 197.3,
        "en_text": "- Excuse me.",
        "vi_text": "- Xin lỗi.",
        "ipa": "/ ɪkˈskjuz mi./"
      },
      {
        "id": 87,
        "startTime": 197.3,
        "endTime": 199.77,
        "en_text": "Which way to the paddling pool, please?",
        "vi_text": "Làm ơn đi đường nào đến bể bơi?",
        "ipa": "/wɪʧ weɪ tɪ ðə ˈpædəlɪŋ pul, pliz?/"
      },
      {
        "id": 88,
        "startTime": 199.77,
        "endTime": 201.17,
        "en_text": "- Just through that door.",
        "vi_text": "- Chỉ cần qua cánh cửa đó thôi.",
        "ipa": "/ ʤɪst θru ðət dɔr./"
      },
      {
        "id": 89,
        "startTime": 201.17,
        "endTime": 202.44,
        "en_text": "- Thank you.",
        "vi_text": "- Cảm ơn.",
        "ipa": "/ θæŋk ju./"
      },
      {
        "id": 90,
        "startTime": 202.87,
        "endTime": 205.0,
        "en_text": "No, this looks different.",
        "vi_text": "Không, cái này có vẻ khác.",
        "ipa": "/noʊ, ðɪs lʊks ˈdɪfərənt./"
      },
      {
        "id": 91,
        "startTime": 205.87,
        "endTime": 207.34,
        "en_text": "I think we're lost.",
        "vi_text": "Tôi nghĩ chúng ta đã lạc đường.",
        "ipa": "/aɪ θɪŋk wɪr lɔst./"
      },
      {
        "id": 92,
        "startTime": 207.34,
        "endTime": 208.74,
        "en_text": "- Can I help you?",
        "vi_text": "- Tôi có thể giúp gì cho bạn?",
        "ipa": "/ kən aɪ hɛlp ju?/"
      },
      {
        "id": 93,
        "startTime": 208.74,
        "endTime": 210.94,
        "en_text": "- Ah! Captain Otter! (snorts)",
        "vi_text": "- À! Thuyền trưởng Rái cá! (khịt mũi)",
        "ipa": "/ ɑ! ˈkæptən ˈɑtər! (snɔrts)/"
      },
      {
        "id": 94,
        "startTime": 210.94,
        "endTime": 213.18,
        "en_text": "- This paddling pool is wrong.",
        "vi_text": "- Bể bơi này sai rồi.",
        "ipa": "/ ðɪs ˈpædəlɪŋ pul ɪz rɔŋ./"
      },
      {
        "id": 95,
        "startTime": 213.18,
        "endTime": 215.75,
        "en_text": "- We have ten paddling pools on the ship.",
        "vi_text": "- Chúng tôi có 10 bể bơi trên tàu.",
        "ipa": "/ wi hæv tɛn ˈpædəlɪŋ pulz ɔn ðə ʃɪp./"
      },
      {
        "id": 96,
        "startTime": 215.75,
        "endTime": 217.18,
        "en_text": "- I see.",
        "vi_text": "- Tôi hiểu rồi.",
        "ipa": "/ aɪ si./"
      },
      {
        "id": 97,
        "startTime": 217.18,
        "endTime": 219.95,
        "en_text": "Maybe we should just go back to our cabin?",
        "vi_text": "Có lẽ chúng ta nên quay lại cabin của mình?",
        "ipa": "/ˈmeɪbi wi ʃʊd ʤɪst goʊ bæk tɪ ɑr ˈkæbən?/"
      },
      {
        "id": 98,
        "startTime": 219.95,
        "endTime": 222.82,
        "en_text": "- Of course! Your ticket will show you the way.",
        "vi_text": "- Tất nhiên rồi! Vé của bạn sẽ chỉ đường cho bạn.",
        "ipa": "/ əv kɔrs! jʊr ˈtɪkɪt wɪl ʃoʊ ju ðə weɪ./"
      },
      {
        "id": 99,
        "startTime": 222.82,
        "endTime": 224.99,
        "en_text": "Every ticket has a colour,",
        "vi_text": "Mỗi vé có một màu",
        "ipa": "/ˈɛvəri ˈtɪkɪt həz ə ˈkələr,/"
      },
      {
        "id": 100,
        "startTime": 224.99,
        "endTime": 226.83,
        "en_text": "a shape, and a number.",
        "vi_text": "một hình và một số.",
        "ipa": "/ə ʃeɪp, ənd ə ˈnəmbər./"
      },
      {
        "id": 101,
        "startTime": 226.83,
        "endTime": 228.49,
        "en_text": "(Peppa): Blue...",
        "vi_text": "(Peppa): Màu xanh...",
        "ipa": "/(peppa*): blu.../"
      },
      {
        "id": 102,
        "startTime": 228.49,
        "endTime": 229.9,
        "en_text": "Triangle...",
        "vi_text": "Tam giác...",
        "ipa": "/ˈtraɪˌæŋgəl.../"
      },
      {
        "id": 103,
        "startTime": 229.9,
        "endTime": 231.2,
        "en_text": "Six!",
        "vi_text": "Sáu!",
        "ipa": "/sɪks!/"
      },
      {
        "id": 104,
        "startTime": 231.2,
        "endTime": 232.3,
        "en_text": "- That's right.",
        "vi_text": "- Đúng vậy.",
        "ipa": "/ ðæts raɪt./"
      },
      {
        "id": 105,
        "startTime": 232.3,
        "endTime": 234.03,
        "en_text": "Just follow the arrows!",
        "vi_text": "Chỉ cần làm theo các mũi tên!",
        "ipa": "/ʤɪst ˈfɑloʊ ðə ˈɛroʊz!/"
      },
      {
        "id": 106,
        "startTime": 234.03,
        "endTime": 236.5,
        "en_text": "- Blue! This way, Grandpa!",
        "vi_text": "- Màu xanh da trời! Lối này, ông nội!",
        "ipa": "/ blu! ðɪs weɪ, ˈgrændˌpɑ!/"
      },
      {
        "id": 107,
        "startTime": 236.87,
        "endTime": 238.77,
        "en_text": "Triangle...",
        "vi_text": "Tam giác...",
        "ipa": "/ˈtraɪˌæŋgəl.../"
      },
      {
        "id": 108,
        "startTime": 238.77,
        "endTime": 240.27,
        "en_text": "Down! (giggling)",
        "vi_text": "Xuống! (cười khúc khích)",
        "ipa": "/daʊn! (ˈgɪgəlɪŋ)/"
      },
      {
        "id": 109,
        "startTime": 240.27,
        "endTime": 241.84,
        "en_text": "Easy!",
        "vi_text": "Dễ!",
        "ipa": "/ˈizi!/"
      },
      {
        "id": 110,
        "startTime": 241.84,
        "endTime": 245.81,
        "en_text": "One, two, three, four, five, six!",
        "vi_text": "Một, hai, ba, bốn, năm, sáu!",
        "ipa": "/wən, tu, θri, fɔr, faɪv, sɪks!/"
      },
      {
        "id": 111,
        "startTime": 245.81,
        "endTime": 247.91,
        "en_text": "- Peppa! Grandpa Pig!",
        "vi_text": "- Peppa! Ông nội lợn ơi!",
        "ipa": "/ peppa*! ˈgrændˌpɑ pɪg!/"
      },
      {
        "id": 112,
        "startTime": 247.91,
        "endTime": 249.85,
        "en_text": "Where ever have you been?!",
        "vi_text": "Bạn đã từng ở đâu thế?!",
        "ipa": "/wɛr ˈɛvər hæv ju bɪn?!/"
      },
      {
        "id": 113,
        "startTime": 249.85,
        "endTime": 251.95,
        "en_text": "- We got a bit lost.",
        "vi_text": "- Chúng ta hơi lạc đường.",
        "ipa": "/ wi gɑt ə bɪt lɔst./"
      },
      {
        "id": 114,
        "startTime": 251.95,
        "endTime": 255.42,
        "en_text": "- But clever Peppa found the way back again!",
        "vi_text": "- Nhưng Peppa thông minh đã tìm được đường quay lại!",
        "ipa": "/ bət ˈklɛvər peppa* faʊnd ðə weɪ bæk əˈgɛn!/"
      },
      {
        "id": 115,
        "startTime": 255.42,
        "endTime": 256.89,
        "en_text": "- Have some pizza.",
        "vi_text": "- Ăn pizza đi.",
        "ipa": "/ hæv səm ˈpitsə./"
      },
      {
        "id": 116,
        "startTime": 256.89,
        "endTime": 258.56,
        "en_text": "It was delivered to our cabin!",
        "vi_text": "Nó đã được chuyển đến cabin của chúng tôi!",
        "ipa": "/ɪt wɑz dɪˈlɪvərd tɪ ɑr ˈkæbən!/"
      },
      {
        "id": 117,
        "startTime": 258.56,
        "endTime": 260.33,
        "en_text": "- Pizza! Pizza!",
        "vi_text": "- Pizza! Pizza!",
        "ipa": "/ ˈpitsə! ˈpitsə!/"
      },
      {
        "id": 118,
        "startTime": 260.33,
        "endTime": 262.1,
        "en_text": "- How civilised.",
        "vi_text": "- Thật là văn minh.",
        "ipa": "/ haʊ civilised*./"
      },
      {
        "id": 119,
        "startTime": 262.1,
        "endTime": 264.9,
        "en_text": "- I love this cruise ship holiday!",
        "vi_text": "- Tôi yêu kỳ nghỉ tàu du lịch này!",
        "ipa": "/ aɪ ləv ðɪs kruz ʃɪp ˈhɑlɪˌdeɪ!/"
      },
      {
        "id": 120,
        "startTime": 264.9,
        "endTime": 266.3,
        "en_text": "(all laugh)",
        "vi_text": "(tất cả cười)",
        "ipa": "/(ɔl læf)/"
      },
      {
        "id": 121,
        "startTime": 266.3,
        "endTime": 269.8,
        "en_text": "(narrator): Everybody loves a cruise ship holiday!",
        "vi_text": "(người kể chuyện): Mọi người đều thích một kỳ nghỉ trên tàu du lịch!",
        "ipa": "/(ˈnɛreɪtər): ˈɛvriˌbɑdi ləvz ə kruz ʃɪp ˈhɑlɪˌdeɪ!/"
      },
      {
        "id": 122,
        "startTime": 269.9,
        "endTime": 272.6,
        "en_text": "(Peppa): Holiday on the Sea!",
        "vi_text": "(Peppa): Kỳ nghỉ trên biển!",
        "ipa": "/(peppa*): ˈhɑlɪˌdeɪ ɔn ðə si!/"
      },
      {
        "id": 123,
        "startTime": 272.61,
        "endTime": 276.04,
        "en_text": "(narrator): Peppa and George are on a cruise ship holiday",
        "vi_text": "(người kể chuyện): Peppa và George đang đi nghỉ trên tàu du lịch",
        "ipa": "/(ˈnɛreɪtər): peppa* ənd ʤɔrʤ ər ɔn ə kruz ʃɪp ˈhɑlɪˌdeɪ/"
      },
      {
        "id": 124,
        "startTime": 276.04,
        "endTime": 277.64,
        "en_text": "with Granny and Grandpa Pig.",
        "vi_text": "với bà nội và ông nội lợn.",
        "ipa": "/wɪθ ˈgræni ənd ˈgrændˌpɑ pɪg./"
      },
      {
        "id": 125,
        "startTime": 277.64,
        "endTime": 280.01,
        "en_text": "(gasps) - We're on a big boat",
        "vi_text": "(thở hổn hển) - Chúng ta đang ở trên một chiếc thuyền lớn",
        "ipa": "/(gæsps)  wɪr ɔn ə bɪg boʊt/"
      },
      {
        "id": 126,
        "startTime": 280.01,
        "endTime": 281.41,
        "en_text": "on the sea!",
        "vi_text": "trên biển!",
        "ipa": "/ɔn ðə si!/"
      },
      {
        "id": 127,
        "startTime": 281.41,
        "endTime": 282.65,
        "en_text": "(snorts, giggles)",
        "vi_text": "(khịt mũi, cười khúc khích)",
        "ipa": "/(snɔrts, ˈgɪgəlz)/"
      },
      {
        "id": 128,
        "startTime": 282.65,
        "endTime": 285.45,
        "en_text": "- There are so many things to do on this boat!",
        "vi_text": "- Có rất nhiều thứ để làm trên chiếc thuyền này!",
        "ipa": "/ ðɛr ər soʊ ˈmɛni θɪŋz tɪ du ɔn ðɪs boʊt!/"
      },
      {
        "id": 129,
        "startTime": 285.45,
        "endTime": 288.12,
        "en_text": "- What do we do first, Granny?",
        "vi_text": "- Chúng ta làm gì đầu tiên vậy bà?",
        "ipa": "/ wət du wi du fərst, ˈgræni?/"
      },
      {
        "id": 130,
        "startTime": 288.12,
        "endTime": 290.22,
        "en_text": "- I think we should have breakfast.",
        "vi_text": "- Tôi nghĩ chúng ta nên ăn sáng.",
        "ipa": "/ aɪ θɪŋk wi ʃʊd hæv ˈbrɛkfəst./"
      },
      {
        "id": 131,
        "startTime": 290.26,
        "endTime": 293.36,
        "en_text": "- Ah! But would that be a mermaid breakfast?",
        "vi_text": "- À! Nhưng liệu đó có phải là bữa sáng của nàng tiên cá?",
        "ipa": "/ ɑ! bət wʊd ðət bi ə ˈmərˌmeɪd ˈbrɛkfəst?/"
      },
      {
        "id": 132,
        "startTime": 293.36,
        "endTime": 295.46,
        "en_text": "Or a dinosaur breakfast?",
        "vi_text": "Hay một bữa sáng khủng long?",
        "ipa": "/ər ə ˈdaɪnəˌsɔr ˈbrɛkfəst?/"
      },
      {
        "id": 133,
        "startTime": 295.5,
        "endTime": 298.4,
        "en_text": "(gasps) - Dine-saw! Grr!",
        "vi_text": "(thở hổn hển) - Cưa ăn! Grr!",
        "ipa": "/(gæsps)  dine-saw*! grr*!/"
      },
      {
        "id": 134,
        "startTime": 298.4,
        "endTime": 299.6,
        "en_text": "(children giggling)",
        "vi_text": "(trẻ em cười khúc khích)",
        "ipa": "/(ˈʧɪldrən ˈgɪgəlɪŋ)/"
      },
      {
        "id": 135,
        "startTime": 299.6,
        "endTime": 301.63,
        "en_text": "(narrator): This is the dinosaur café.",
        "vi_text": "(người kể chuyện): Đây là quán cà phê khủng long.",
        "ipa": "/(ˈnɛreɪtər): ðɪs ɪz ðə ˈdaɪnəˌsɔr café*é./"
      },
      {
        "id": 136,
        "startTime": 301.67,
        "endTime": 305.34,
        "en_text": "- Morning! Would you like some dinosaur breakfast eggs?",
        "vi_text": "- Buổi sáng! Bạn có muốn ăn sáng với trứng khủng long không?",
        "ipa": "/ ˈmɔrnɪŋ! wʊd ju laɪk səm ˈdaɪnəˌsɔr ˈbrɛkfəst ɛgz?/"
      },
      {
        "id": 137,
        "startTime": 305.34,
        "endTime": 308.24,
        "en_text": "(narrator): Dinosaur breakfast eggs have spots on them.",
        "vi_text": "(người kể chuyện): Trứng ăn sáng của loài khủng long có đốm trên đó.",
        "ipa": "/(ˈnɛreɪtər): ˈdaɪnəˌsɔr ˈbrɛkfəst ɛgz hæv spɑts ɔn ðɛm./"
      },
      {
        "id": 138,
        "startTime": 308.24,
        "endTime": 311.08,
        "en_text": "- Wow! (giggling)",
        "vi_text": "- Ồ! (cười khúc khích)",
        "ipa": "/ waʊ! (ˈgɪgəlɪŋ)/"
      },
      {
        "id": 139,
        "startTime": 311.08,
        "endTime": 313.28,
        "en_text": "- Ahoy there, sailors!",
        "vi_text": "- Ôi, các thủy thủ!",
        "ipa": "/ əˈhɔɪ ðɛr, ˈseɪlərz!/"
      },
      {
        "id": 140,
        "startTime": 313.28,
        "endTime": 315.11,
        "en_text": "My name is Pirate Pete",
        "vi_text": "Tên tôi là Cướp Biển Pete",
        "ipa": "/maɪ neɪm ɪz ˈpaɪrət pit/"
      },
      {
        "id": 141,
        "startTime": 315.11,
        "endTime": 317.28,
        "en_text": "and this is Mrs. Mermaid!",
        "vi_text": "và đây là Bà Nàng Tiên Cá!",
        "ipa": "/ənd ðɪs ɪz ˈmɪsɪz. ˈmərˌmeɪd!/"
      },
      {
        "id": 142,
        "startTime": 317.28,
        "endTime": 320.59,
        "en_text": "- Please come to our fancy dress show tonight!",
        "vi_text": "- Xin hãy đến buổi trình diễn trang phục ưa thích của chúng tôi tối nay!",
        "ipa": "/ pliz kəm tɪ ɑr ˈfænsi drɛs ʃoʊ təˈnaɪt!/"
      },
      {
        "id": 143,
        "startTime": 320.62,
        "endTime": 323.36,
        "en_text": "- We'll all have lots of fun!",
        "vi_text": "- Tất cả chúng ta sẽ có rất nhiều niềm vui!",
        "ipa": "/ wɪl ɔl hæv lɑts əv fən!/"
      },
      {
        "id": 144,
        "startTime": 323.36,
        "endTime": 326.02,
        "en_text": "- Oh, yes! We should go to the show tonight!",
        "vi_text": "- Ồ, vâng! Chúng ta nên đi xem buổi biểu diễn tối nay!",
        "ipa": "/ oʊ, jɛs! wi ʃʊd goʊ tɪ ðə ʃoʊ təˈnaɪt!/"
      },
      {
        "id": 145,
        "startTime": 326.06,
        "endTime": 329.56,
        "en_text": "- But before that, what would you like to do?",
        "vi_text": "- Nhưng trước đó cậu muốn làm gì?",
        "ipa": "/ bət ˌbiˈfɔr ðət, wət wʊd ju laɪk tɪ du?/"
      },
      {
        "id": 146,
        "startTime": 329.56,
        "endTime": 333.17,
        "en_text": "Trampolines, splash pools, mini-golf?",
        "vi_text": "Tấm bạt lò xo, bể bơi, sân gôn mini?",
        "ipa": "/trampolines*, splæʃ pulz, mini-golf*?/"
      },
      {
        "id": 147,
        "startTime": 333.17,
        "endTime": 335.23,
        "en_text": "- No! No! No!",
        "vi_text": "- KHÔNG! KHÔNG! KHÔNG!",
        "ipa": "/ noʊ! noʊ! noʊ!/"
      },
      {
        "id": 148,
        "startTime": 335.23,
        "endTime": 336.64,
        "en_text": "- Why not just try them?",
        "vi_text": "- Sao không thử xem?",
        "ipa": "/ waɪ nɑt ʤɪst traɪ ðɛm?/"
      },
      {
        "id": 149,
        "startTime": 336.64,
        "endTime": 338.77,
        "en_text": "Everything on this cruise ship is free!",
        "vi_text": "Mọi thứ trên tàu du lịch này đều miễn phí!",
        "ipa": "/ˈɛvriˌθɪŋ ɔn ðɪs kruz ʃɪp ɪz fri!/"
      },
      {
        "id": 150,
        "startTime": 338.77,
        "endTime": 340.31,
        "en_text": "- Is it really?",
        "vi_text": "- Có thật vậy không?",
        "ipa": "/ ɪz ɪt ˈrɪli?/"
      },
      {
        "id": 151,
        "startTime": 340.34,
        "endTime": 343.61,
        "en_text": "- Yes! Except the ride-on potato.",
        "vi_text": "- Đúng! Ngoại trừ khoai tây cưỡi ngựa.",
        "ipa": "/ jɛs! ɪkˈsɛpt ðə ride-on* pəˈteɪˌtoʊ./"
      },
      {
        "id": 152,
        "startTime": 343.61,
        "endTime": 345.11,
        "en_text": "- Ooh!",
        "vi_text": "- Ồ!",
        "ipa": "/ u!/"
      },
      {
        "id": 153,
        "startTime": 345.14,
        "endTime": 348.55,
        "en_text": "(narrator): George wants to do the ride-on potato/",
        "vi_text": "(người kể chuyện): George muốn làm trò cưỡi khoai tây/",
        "ipa": "/(ˈnɛreɪtər): ʤɔrʤ wɔnts tɪ du ðə ride-on* pəˈteɪˌtoʊ//"
      },
      {
        "id": 154,
        "startTime": 349.51,
        "endTime": 352.12,
        "en_text": "(giggling) - Tay-toe!",
        "vi_text": "(cười khúc khích) - Tay-toe!",
        "ipa": "/(ˈgɪgəlɪŋ)  tay-toe*!/"
      },
      {
        "id": 155,
        "startTime": 352.12,
        "endTime": 354.15,
        "en_text": "- Good. You stay here with George.",
        "vi_text": "- Tốt. Cậu ở lại đây với George.",
        "ipa": "/ gʊd. ju steɪ hir wɪθ ʤɔrʤ./"
      },
      {
        "id": 156,
        "startTime": 354.19,
        "endTime": 356.29,
        "en_text": "Peppa and I will find something else to do.",
        "vi_text": "Peppa và tôi sẽ tìm việc khác để làm.",
        "ipa": "/peppa* ənd aɪ wɪl faɪnd ˈsəmθɪŋ ɛls tɪ du./"
      },
      {
        "id": 157,
        "startTime": 356.29,
        "endTime": 358.36,
        "en_text": "(George giggles)",
        "vi_text": "(George cười khúc khích)",
        "ipa": "/(ʤɔrʤ ˈgɪgəlz)/"
      },
      {
        "id": 158,
        "startTime": 358.76,
        "endTime": 361.36,
        "en_text": "(gasps) - Trampolines!",
        "vi_text": "(thở hổn hển) - Tấm bạt lò xo!",
        "ipa": "/(gæsps)  trampolines*!/"
      },
      {
        "id": 159,
        "startTime": 361.36,
        "endTime": 362.86,
        "en_text": "Yippee! (giggling)",
        "vi_text": "Yippee! (cười khúc khích)",
        "ipa": "/ˌjɪˈpi! (ˈgɪgəlɪŋ)/"
      },
      {
        "id": 160,
        "startTime": 362.89,
        "endTime": 364.56,
        "en_text": "(narrator): Here is Rohan Rhino.",
        "vi_text": "(người kể chuyện): Đây là Rohan Rhino.",
        "ipa": "/(ˈnɛreɪtər): hir ɪz roʊən ˈraɪˌnoʊ./"
      },
      {
        "id": 161,
        "startTime": 364.56,
        "endTime": 365.73,
        "en_text": "- Hello, Peppa!",
        "vi_text": "- Chào Peppa!",
        "ipa": "/ hɛˈloʊ, peppa*!/"
      },
      {
        "id": 162,
        "startTime": 365.73,
        "endTime": 367.2,
        "en_text": "- Hello, Rohan!",
        "vi_text": "- Chào Rohan!",
        "ipa": "/ hɛˈloʊ, roʊən!/"
      },
      {
        "id": 163,
        "startTime": 367.2,
        "endTime": 370.37,
        "en_text": "- Do you want to play in the mermaid splash pool?",
        "vi_text": "- Bạn có muốn chơi trong bể bơi nàng tiên cá không?",
        "ipa": "/ du ju wɔnt tɪ pleɪ ɪn ðə ˈmərˌmeɪd splæʃ pul?/"
      },
      {
        "id": 164,
        "startTime": 370.37,
        "endTime": 372.61,
        "en_text": "- Yes! Let's go!",
        "vi_text": "- Đúng! Đi thôi!",
        "ipa": "/ jɛs! lɛts goʊ!/"
      },
      {
        "id": 165,
        "startTime": 372.61,
        "endTime": 373.77,
        "en_text": "Granny!",
        "vi_text": "Bà ơi!",
        "ipa": "/ˈgræni!/"
      },
      {
        "id": 166,
        "startTime": 373.77,
        "endTime": 376.44,
        "en_text": "- Oh. Have you finished bouncing already?",
        "vi_text": "- Ồ. Bạn đã nảy xong chưa?",
        "ipa": "/ oʊ. hæv ju ˈfɪnɪʃt ˈbaʊnsɪŋ ɔˈrɛdi?/"
      },
      {
        "id": 167,
        "startTime": 376.44,
        "endTime": 377.84,
        "en_text": "(upbeat music)",
        "vi_text": "(nhạc sôi động)",
        "ipa": "/(ˈəpˌbit mˈjuzɪk)/"
      },
      {
        "id": 168,
        "startTime": 377.84,
        "endTime": 379.28,
        "en_text": "(music fades) - Oh...",
        "vi_text": "(nhạc nhỏ dần) - Ồ...",
        "ipa": "/(mˈjuzɪk feɪdz)  oʊ.../"
      },
      {
        "id": 169,
        "startTime": 379.28,
        "endTime": 383.32,
        "en_text": "- Maybe that's enough potato for one day, George?",
        "vi_text": "- Có lẽ thế là đủ khoai tây cho một ngày phải không, George?",
        "ipa": "/ ˈmeɪbi ðæts ɪˈnəf pəˈteɪˌtoʊ fər wən deɪ, ʤɔrʤ?/"
      },
      {
        "id": 170,
        "startTime": 383.32,
        "endTime": 384.78,
        "en_text": "- Tay-toe! Tay-toe!",
        "vi_text": "- Tay-toe! Tay-ngón chân!",
        "ipa": "/ tay-toe*! tay-toe*!/"
      },
      {
        "id": 171,
        "startTime": 384.82,
        "endTime": 386.39,
        "en_text": "- Oh.",
        "vi_text": "- Ồ.",
        "ipa": "/ oʊ./"
      },
      {
        "id": 172,
        "startTime": 386.39,
        "endTime": 387.72,
        "en_text": "(upbeat music)",
        "vi_text": "(nhạc sôi động)",
        "ipa": "/(ˈəpˌbit mˈjuzɪk)/"
      },
      {
        "id": 173,
        "startTime": 387.72,
        "endTime": 389.76,
        "en_text": "(giggling)",
        "vi_text": "(cười khúc khích)",
        "ipa": "/(ˈgɪgəlɪŋ)/"
      },
      {
        "id": 174,
        "startTime": 389.76,
        "endTime": 392.42,
        "en_text": "(narrator): This is the mermaid splash pool.",
        "vi_text": "(người kể chuyện): Đây là bể bơi dành cho nàng tiên cá.",
        "ipa": "/(ˈnɛreɪtər): ðɪs ɪz ðə ˈmərˌmeɪd splæʃ pul./"
      },
      {
        "id": 175,
        "startTime": 392.46,
        "endTime": 394.29,
        "en_text": "- Wee!",
        "vi_text": "- Ối!",
        "ipa": "/ wi!/"
      },
      {
        "id": 176,
        "startTime": 394.29,
        "endTime": 396.66,
        "en_text": "(giggles, snorts) - This is fun!",
        "vi_text": "(cười khúc khích, khịt mũi) - Vui quá!",
        "ipa": "/(ˈgɪgəlz, snɔrts)  ðɪs ɪz fən!/"
      },
      {
        "id": 177,
        "startTime": 396.7,
        "endTime": 398.4,
        "en_text": "(giggling)",
        "vi_text": "(cười khúc khích)",
        "ipa": "/(ˈgɪgəlɪŋ)/"
      },
      {
        "id": 178,
        "startTime": 398.4,
        "endTime": 399.43,
        "en_text": "(music fades)",
        "vi_text": "(âm nhạc nhỏ dần)",
        "ipa": "/(mˈjuzɪk feɪdz)/"
      },
      {
        "id": 179,
        "startTime": 399.46,
        "endTime": 400.77,
        "en_text": "- That's it, George.",
        "vi_text": "- Thế đấy, George.",
        "ipa": "/ ðæts ɪt, ʤɔrʤ./"
      },
      {
        "id": 180,
        "startTime": 400.77,
        "endTime": 403.17,
        "en_text": "I have no more coins left!",
        "vi_text": "Tôi không còn xu nào nữa!",
        "ipa": "/aɪ hæv noʊ mɔr kɔɪnz lɛft!/"
      },
      {
        "id": 181,
        "startTime": 403.17,
        "endTime": 404.24,
        "en_text": "- Oh.",
        "vi_text": "- Ồ.",
        "ipa": "/ oʊ./"
      },
      {
        "id": 182,
        "startTime": 404.24,
        "endTime": 405.27,
        "en_text": "- Hello, boys!",
        "vi_text": "- Xin chào các chàng trai!",
        "ipa": "/ hɛˈloʊ, bɔɪz!/"
      },
      {
        "id": 183,
        "startTime": 405.3,
        "endTime": 407.27,
        "en_text": "We need to get ready for the show.",
        "vi_text": "Chúng ta cần chuẩn bị sẵn sàng cho buổi biểu diễn.",
        "ipa": "/wi nid tɪ gɪt ˈrɛdi fər ðə ʃoʊ./"
      },
      {
        "id": 184,
        "startTime": 407.74,
        "endTime": 409.88,
        "en_text": "(narrator): It's showtime on the cruise ship.",
        "vi_text": "(người kể chuyện): Đã đến giờ chiếu phim trên tàu du lịch.",
        "ipa": "/(ˈnɛreɪtər): ɪts ˈʃoʊˌtaɪm ɔn ðə kruz ʃɪp./"
      },
      {
        "id": 185,
        "startTime": 409.88,
        "endTime": 412.48,
        "en_text": "Everyone has dressed up to watch.",
        "vi_text": "Mọi người đều hóa trang để xem.",
        "ipa": "/ˈɛvriˌwən həz drɛst əp tɪ wɔʧ./"
      },
      {
        "id": 186,
        "startTime": 412.48,
        "endTime": 413.68,
        "en_text": "(children): Ooh!",
        "vi_text": "(trẻ em): Ôi!",
        "ipa": "/(ˈʧɪldrən): u!/"
      },
      {
        "id": 187,
        "startTime": 413.68,
        "endTime": 416.58,
        "en_text": "- Good evening, boys and girls!",
        "vi_text": "- Chào buổi tối các chàng trai và cô gái!",
        "ipa": "/ gʊd ˈivnɪŋ, bɔɪz ənd gərlz!/"
      },
      {
        "id": 188,
        "startTime": 416.62,
        "endTime": 418.82,
        "en_text": "I'm Pirate Pete!",
        "vi_text": "Tôi là Cướp biển Pete!",
        "ipa": "/əm ˈpaɪrət pit!/"
      },
      {
        "id": 189,
        "startTime": 418.82,
        "endTime": 420.92,
        "en_text": "♪ I sailed around the seas",
        "vi_text": "♪ Tôi đi thuyền vòng quanh biển",
        "ipa": "/♪* aɪ seɪld əraʊnd ðə siz/"
      },
      {
        "id": 190,
        "startTime": 420.92,
        "endTime": 422.89,
        "en_text": "♪ And treasure was my wish",
        "vi_text": "♪ Và kho báu là điều ước của tôi",
        "ipa": "/♪* ənd ˈtrɛʒər wɑz maɪ wɪʃ/"
      },
      {
        "id": 191,
        "startTime": 422.89,
        "endTime": 424.76,
        "en_text": "♪ But nothin' did I find there",
        "vi_text": "♪ Nhưng tôi không tìm thấy gì ở đó",
        "ipa": "/♪* bət ˈnɑθɪn' dɪd aɪ faɪnd ðɛr/"
      },
      {
        "id": 192,
        "startTime": 424.76,
        "endTime": 426.76,
        "en_text": "♪ Except a great big fish",
        "vi_text": "♪ Ngoại trừ một con cá lớn",
        "ipa": "/♪* ɪkˈsɛpt ə greɪt bɪg fɪʃ/"
      },
      {
        "id": 193,
        "startTime": 426.76,
        "endTime": 429.19,
        "en_text": "- Oi! I'm a mermaid! Not a fish!",
        "vi_text": "- Ôi! Tôi là một nàng tiên cá! Không phải là một con cá!",
        "ipa": "/ ɔɪ! əm ə ˈmərˌmeɪd! nɑt ə fɪʃ!/"
      },
      {
        "id": 194,
        "startTime": 429.19,
        "endTime": 431.2,
        "en_text": "(children giggling) - Do you want to come",
        "vi_text": "(trẻ cười khúc khích) - Bạn có muốn đến không",
        "ipa": "/(ˈʧɪldrən ˈgɪgəlɪŋ)  du ju wɔnt tɪ kəm/"
      },
      {
        "id": 195,
        "startTime": 431.2,
        "endTime": 432.67,
        "en_text": "look for treasure?",
        "vi_text": "tìm kho báu?",
        "ipa": "/lʊk fər ˈtrɛʒər?/"
      },
      {
        "id": 196,
        "startTime": 432.7,
        "endTime": 434.4,
        "en_text": "- I don't need to.",
        "vi_text": "- Tôi không cần.",
        "ipa": "/ aɪ doʊnt nid tɪ./"
      },
      {
        "id": 197,
        "startTime": 434.4,
        "endTime": 437.37,
        "en_text": "I've got a magic box!",
        "vi_text": "Tôi có một chiếc hộp ma thuật!",
        "ipa": "/aɪv gɑt ə ˈmæʤɪk bɑks!/"
      },
      {
        "id": 198,
        "startTime": 437.37,
        "endTime": 438.5,
        "en_text": "(all): Ooh!",
        "vi_text": "(tất cả): Ôi!",
        "ipa": "/(ɔl): u!/"
      },
      {
        "id": 199,
        "startTime": 438.54,
        "endTime": 441.37,
        "en_text": "- It will give you whatever you wish for!",
        "vi_text": "- Nó sẽ cho bạn bất cứ điều gì bạn muốn!",
        "ipa": "/ ɪt wɪl gɪv ju ˌwəˈtɛvər ju wɪʃ fər!/"
      },
      {
        "id": 200,
        "startTime": 441.37,
        "endTime": 443.91,
        "en_text": "Just say the magic word.",
        "vi_text": "Chỉ cần nói từ kỳ diệu.",
        "ipa": "/ʤɪst seɪ ðə ˈmæʤɪk wərd./"
      },
      {
        "id": 201,
        "startTime": 443.94,
        "endTime": 445.68,
        "en_text": "- Which is?",
        "vi_text": "- Đó là cái nào?",
        "ipa": "/ wɪʧ ɪz?/"
      },
      {
        "id": 202,
        "startTime": 445.68,
        "endTime": 447.48,
        "en_text": "- Uh... Oh, I've forgotten.",
        "vi_text": "- Ờ... Ồ, tôi quên mất.",
        "ipa": "/ ə... oʊ, aɪv fərˈgɑtən./"
      },
      {
        "id": 203,
        "startTime": 447.48,
        "endTime": 449.15,
        "en_text": "Sorry, memory like a fish.",
        "vi_text": "Xin lỗi, ký ức như một con cá.",
        "ipa": "/ˈsɑri, ˈmɛməri laɪk ə fɪʃ./"
      },
      {
        "id": 204,
        "startTime": 449.18,
        "endTime": 450.32,
        "en_text": "(children laugh)",
        "vi_text": "(trẻ con cười)",
        "ipa": "/(ˈʧɪldrən læf)/"
      },
      {
        "id": 205,
        "startTime": 450.32,
        "endTime": 452.75,
        "en_text": "- Who knows a magic word?",
        "vi_text": "- Ai biết được một từ thần kỳ?",
        "ipa": "/ hu noʊz ə ˈmæʤɪk wərd?/"
      },
      {
        "id": 206,
        "startTime": 452.79,
        "endTime": 454.82,
        "en_text": "(children): Abra-cadabra!",
        "vi_text": "(trẻ em): Abra-cadabra!",
        "ipa": "/(ˈʧɪldrən): abra-cadabra*!/"
      },
      {
        "id": 207,
        "startTime": 454.82,
        "endTime": 457.72,
        "en_text": "- What? A candelabra?",
        "vi_text": "- Cái gì? Một cây nến?",
        "ipa": "/ wət? ə ˌkændəˈlɑbrə?/"
      },
      {
        "id": 208,
        "startTime": 457.72,
        "endTime": 460.33,
        "en_text": "No, it's not working.",
        "vi_text": "Không, nó không hoạt động.",
        "ipa": "/noʊ, ɪts nɑt ˈwərkɪŋ./"
      },
      {
        "id": 209,
        "startTime": 460.33,
        "endTime": 463.86,
        "en_text": "Mrs. Mermaid, can you check the box is not broken?",
        "vi_text": "Bà Nàng tiên cá, bà có thể kiểm tra xem chiếc hộp có bị vỡ không?",
        "ipa": "/ˈmɪsɪz. ˈmərˌmeɪd, kən ju ʧɛk ðə bɑks ɪz nɑt ˈbroʊkən?/"
      },
      {
        "id": 210,
        "startTime": 463.9,
        "endTime": 465.56,
        "en_text": "(children): Abra-cadabra!",
        "vi_text": "(trẻ em): Abra-cadabra!",
        "ipa": "/(ˈʧɪldrən): abra-cadabra*!/"
      },
      {
        "id": 211,
        "startTime": 465.56,
        "endTime": 468.57,
        "en_text": "- Oh! Abra-cadabra!",
        "vi_text": "- Ồ! Abra-cadabra!",
        "ipa": "/ oʊ! abra-cadabra*!/"
      },
      {
        "id": 212,
        "startTime": 468.83,
        "endTime": 470.4,
        "en_text": "(all): Ooh!",
        "vi_text": "(tất cả): Ôi!",
        "ipa": "/(ɔl): u!/"
      },
      {
        "id": 213,
        "startTime": 470.84,
        "endTime": 472.0,
        "en_text": "- Look at that!",
        "vi_text": "- Nhìn kìa!",
        "ipa": "/ lʊk æt ðət!/"
      },
      {
        "id": 214,
        "startTime": 472.0,
        "endTime": 474.81,
        "en_text": "Chocolate coins for everyone!",
        "vi_text": "Đồng xu sô cô la cho tất cả mọi người!",
        "ipa": "/ˈʧɔklət kɔɪnz fər ˈɛvriˌwən!/"
      },
      {
        "id": 215,
        "startTime": 474.81,
        "endTime": 476.64,
        "en_text": "(all): Hoooray!",
        "vi_text": "(tất cả): Hoan hô!",
        "ipa": "/(ɔl): hoooray*!/"
      },
      {
        "id": 216,
        "startTime": 476.64,
        "endTime": 481.51,
        "en_text": "- But wait! My new friend Mrs. Mermaid has gone!",
        "vi_text": "- Nhưng chờ đã! Người bạn mới của tôi, bà Nàng tiên cá đã ra đi!",
        "ipa": "/ bət weɪt! maɪ nu frɛnd ˈmɪsɪz. ˈmərˌmeɪd həz gɔn!/"
      },
      {
        "id": 217,
        "startTime": 481.55,
        "endTime": 482.52,
        "en_text": "(all gasp)",
        "vi_text": "(tất cả thở hổn hển)",
        "ipa": "/(ɔl gæsp)/"
      },
      {
        "id": 218,
        "startTime": 482.51,
        "endTime": 485.32,
        "en_text": "Who can help me magic her back?",
        "vi_text": "Ai có thể giúp tôi phép thuật trở lại của cô ấy?",
        "ipa": "/hu kən hɛlp mi ˈmæʤɪk hər bæk?/"
      },
      {
        "id": 219,
        "startTime": 485.32,
        "endTime": 487.85,
        "en_text": "- Me! I can help you!",
        "vi_text": "- Tôi! Tôi có thể giúp bạn!",
        "ipa": "/ mi! aɪ kən hɛlp ju!/"
      },
      {
        "id": 220,
        "startTime": 487.85,
        "endTime": 490.19,
        "en_text": "- Ah-harr! Come up on stage!",
        "vi_text": "- Ah-harr! Hãy lên sân khấu!",
        "ipa": "/ ah-harr*! kəm əp ɔn steɪʤ!/"
      },
      {
        "id": 221,
        "startTime": 490.22,
        "endTime": 492.53,
        "en_text": "(Peppa giggles) What's your name?",
        "vi_text": "(Peppa cười khúc khích) Tên bạn là gì?",
        "ipa": "/(peppa* ˈgɪgəlz) wəts jʊr neɪm?/"
      },
      {
        "id": 222,
        "startTime": 492.52,
        "endTime": 494.73,
        "en_text": "- I'm Peppa Pig! (snorts)",
        "vi_text": "- Tôi là Peppa Pig! (khịt mũi)",
        "ipa": "/ əm peppa* pɪg! (snɔrts)/"
      },
      {
        "id": 223,
        "startTime": 494.73,
        "endTime": 496.6,
        "en_text": "- So, Peppa Pig,",
        "vi_text": "- Vậy, Peppa Pig,",
        "ipa": "/ soʊ, peppa* pɪg,/"
      },
      {
        "id": 224,
        "startTime": 496.6,
        "endTime": 499.63,
        "en_text": "What do we do to get Mrs. Mermaid back?",
        "vi_text": "Chúng ta phải làm gì để đưa Bà Nàng tiên cá trở lại?",
        "ipa": "/wət du wi du tɪ gɪt ˈmɪsɪz. ˈmərˌmeɪd bæk?/"
      },
      {
        "id": 225,
        "startTime": 499.67,
        "endTime": 501.97,
        "en_text": "- Say the magic word!",
        "vi_text": "- Nói lời kỳ diệu!",
        "ipa": "/ seɪ ðə ˈmæʤɪk wərd!/"
      },
      {
        "id": 226,
        "startTime": 501.97,
        "endTime": 504.0,
        "en_text": "Abra-cadabra!",
        "vi_text": "Abra-cadabra!",
        "ipa": "/abra-cadabra*!/"
      },
      {
        "id": 227,
        "startTime": 504.0,
        "endTime": 505.24,
        "en_text": "- Ta-da!",
        "vi_text": "- Ta-da!",
        "ipa": "/ ta-da*!/"
      },
      {
        "id": 228,
        "startTime": 505.24,
        "endTime": 506.4,
        "en_text": "(children): Hooray!",
        "vi_text": "(trẻ em): Hoan hô!",
        "ipa": "/(ˈʧɪldrən): hʊˈreɪ!/"
      },
      {
        "id": 229,
        "startTime": 506.4,
        "endTime": 508.04,
        "en_text": "- And that is the end of the show!",
        "vi_text": "- Và thế là buổi diễn kết thúc!",
        "ipa": "/ ənd ðət ɪz ðə ɛnd əv ðə ʃoʊ!/"
      },
      {
        "id": 230,
        "startTime": 508.04,
        "endTime": 509.91,
        "en_text": "Good night, everyone!",
        "vi_text": "Chúc mọi người ngủ ngon!",
        "ipa": "/gʊd naɪt, ˈɛvriˌwən!/"
      },
      {
        "id": 231,
        "startTime": 509.94,
        "endTime": 512.51,
        "en_text": "(cheering, applause)",
        "vi_text": "(cổ vũ, vỗ tay)",
        "ipa": "/(ˈʧɪrɪŋ, əˈplɔz)/"
      },
      {
        "id": 232,
        "startTime": 513.98,
        "endTime": 516.92,
        "en_text": "- Oh, that was a wonderful day.",
        "vi_text": "- Ồ, thật là một ngày tuyệt vời.",
        "ipa": "/ oʊ, ðət wɑz ə ˈwəndərfəl deɪ./"
      },
      {
        "id": 233,
        "startTime": 516.92,
        "endTime": 520.65,
        "en_text": "- I can't think how it could be any more special.",
        "vi_text": "- Tôi không thể nghĩ nó có thể đặc biệt hơn thế nào nữa.",
        "ipa": "/ aɪ kænt θɪŋk haʊ ɪt kʊd bi ˈɛni mɔr ˈspɛʃəl./"
      },
      {
        "id": 234,
        "startTime": 521.05,
        "endTime": 523.39,
        "en_text": "Ah! What was that?",
        "vi_text": "À! Đó là gì vậy?",
        "ipa": "/ɑ! wət wɑz ðət?/"
      },
      {
        "id": 235,
        "startTime": 523.42,
        "endTime": 525.93,
        "en_text": "(gasps) - It's a whale!",
        "vi_text": "(thở hổn hển) - Đó là một con cá voi!",
        "ipa": "/(gæsps)  ɪts ə weɪl!/"
      },
      {
        "id": 236,
        "startTime": 525.92,
        "endTime": 526.99,
        "en_text": "(whale calling)",
        "vi_text": "(tiếng cá voi kêu)",
        "ipa": "/(weɪl ˈkɔlɪŋ)/"
      },
      {
        "id": 237,
        "startTime": 527.03,
        "endTime": 528.59,
        "en_text": "(all): Wow!",
        "vi_text": "(tất cả): Ôi!",
        "ipa": "/(ɔl): waʊ!/"
      },
      {
        "id": 238,
        "startTime": 528.59,
        "endTime": 529.63,
        "en_text": "(whale calling)",
        "vi_text": "(tiếng cá voi kêu)",
        "ipa": "/(weɪl ˈkɔlɪŋ)/"
      },
      {
        "id": 239,
        "startTime": 529.66,
        "endTime": 532.6,
        "en_text": "(Peppa): She's saying night-night!",
        "vi_text": "(Peppa): Cô ấy đang nói đêm đêm!",
        "ipa": "/(peppa*): ʃiz seɪɪŋ night-night*!/"
      },
      {
        "id": 240,
        "startTime": 532.6,
        "endTime": 535.83,
        "en_text": "(narrator): It is bedtime on the holiday cruise ship.",
        "vi_text": "(người kể chuyện): Đã đến giờ đi ngủ trên con tàu du lịch đi nghỉ.",
        "ipa": "/(ˈnɛreɪtər): ɪt ɪz ˈbɛdˌtaɪm ɔn ðə ˈhɑlɪˌdeɪ kruz ʃɪp./"
      },
      {
        "id": 241,
        "startTime": 535.84,
        "endTime": 538.67,
        "en_text": "Tomorrow will be another day.",
        "vi_text": "Ngày mai sẽ là một ngày khác.",
        "ipa": "/təˈmɑˌroʊ wɪl bi əˈnəðər deɪ./"
      },
      {
        "id": 242,
        "startTime": 539.37,
        "endTime": 542.57,
        "en_text": "(Peppa): Tropical Day Trip!",
        "vi_text": "(Peppa): Chuyến đi trong ngày nhiệt đới!",
        "ipa": "/(peppa*): ˈtrɑpɪkəl deɪ trɪp!/"
      },
      {
        "id": 243,
        "startTime": 542.58,
        "endTime": 545.71,
        "en_text": "(narrator): Peppa and George are on a cruise ship holiday",
        "vi_text": "(người kể chuyện): Peppa và George đang đi nghỉ trên tàu du lịch",
        "ipa": "/(ˈnɛreɪtər): peppa* ənd ʤɔrʤ ər ɔn ə kruz ʃɪp ˈhɑlɪˌdeɪ/"
      },
      {
        "id": 244,
        "startTime": 545.71,
        "endTime": 547.51,
        "en_text": "with Granny and Grandpa Pig.",
        "vi_text": "với bà nội và ông nội lợn.",
        "ipa": "/wɪθ ˈgræni ənd ˈgrændˌpɑ pɪg./"
      },
      {
        "id": 245,
        "startTime": 547.51,
        "endTime": 549.18,
        "en_text": "- Wake up, George! (George snorts)",
        "vi_text": "- Dậy đi, George! (George khịt mũi)",
        "ipa": "/ weɪk əp, ʤɔrʤ! (ʤɔrʤ snɔrts)/"
      },
      {
        "id": 246,
        "startTime": 549.22,
        "endTime": 552.92,
        "en_text": "There are lots of things to do on this boat!",
        "vi_text": "Có rất nhiều thứ để làm trên chiếc thuyền này!",
        "ipa": "/ðɛr ər lɑts əv θɪŋz tɪ du ɔn ðɪs boʊt!/"
      },
      {
        "id": 247,
        "startTime": 552.92,
        "endTime": 554.52,
        "en_text": "- Well, actually, Peppa,",
        "vi_text": "- Thực ra, Peppa,",
        "ipa": "/ wɛl, ˈæˌkʧuəli, peppa*,/"
      },
      {
        "id": 248,
        "startTime": 554.52,
        "endTime": 556.92,
        "en_text": "we will be getting off the boat today.",
        "vi_text": "hôm nay chúng ta sẽ rời thuyền.",
        "ipa": "/wi wɪl bi ˈgɪtɪŋ ɔf ðə boʊt təˈdeɪ./"
      },
      {
        "id": 249,
        "startTime": 556.92,
        "endTime": 559.02,
        "en_text": "- Is it the end of the holiday?",
        "vi_text": "- Kì nghỉ sắp kết thúc rồi à?",
        "ipa": "/ ɪz ɪt ðə ɛnd əv ðə ˈhɑlɪˌdeɪ?/"
      },
      {
        "id": 250,
        "startTime": 559.06,
        "endTime": 560.19,
        "en_text": "- No. (snorts)",
        "vi_text": "- Không. (khịt mũi)",
        "ipa": "/ noʊ. (snɔrts)/"
      },
      {
        "id": 251,
        "startTime": 560.19,
        "endTime": 562.06,
        "en_text": "We are a long, long way from home.",
        "vi_text": "Chúng ta đang ở một chặng đường dài xa nhà.",
        "ipa": "/wi ər ə lɔŋ, lɔŋ weɪ frəm hoʊm./"
      },
      {
        "id": 252,
        "startTime": 562.09,
        "endTime": 563.76,
        "en_text": "We thought it would nice to get off",
        "vi_text": "Chúng tôi nghĩ sẽ rất tuyệt nếu được xuống xe",
        "ipa": "/wi θɔt ɪt wʊd nis tɪ gɪt ɔf/"
      },
      {
        "id": 253,
        "startTime": 563.76,
        "endTime": 565.23,
        "en_text": "and have a look around.",
        "vi_text": "và nhìn xung quanh.",
        "ipa": "/ənd hæv ə lʊk əraʊnd./"
      },
      {
        "id": 254,
        "startTime": 565.23,
        "endTime": 568.23,
        "en_text": "- Step this way for the Tropical Island Day Trip!",
        "vi_text": "- Hãy đi theo hướng này để tham gia Chuyến đi trong ngày Đảo Nhiệt đới!",
        "ipa": "/ stɛp ðɪs weɪ fər ðə ˈtrɑpɪkəl ˈaɪlənd deɪ trɪp!/"
      },
      {
        "id": 255,
        "startTime": 568.23,
        "endTime": 570.57,
        "en_text": "(gulls squawking)",
        "vi_text": "(mòng biển kêu quang quác)",
        "ipa": "/(gəlz skˈwɔkɪŋ)/"
      },
      {
        "id": 256,
        "startTime": 572.54,
        "endTime": 575.61,
        "en_text": "- Why are we going in a little boat, Granny?",
        "vi_text": "- Tại sao chúng ta lại đi trên một chiếc thuyền nhỏ vậy bà?",
        "ipa": "/ waɪ ər wi goʊɪŋ ɪn ə ˈlɪtəl boʊt, ˈgræni?/"
      },
      {
        "id": 257,
        "startTime": 575.61,
        "endTime": 579.54,
        "en_text": "- The big boat is too big to stop at a tropical island.",
        "vi_text": "- Chiếc thuyền lớn quá lớn để dừng lại ở một hòn đảo nhiệt đới.",
        "ipa": "/ ðə bɪg boʊt ɪz tu bɪg tɪ stɑp æt ə ˈtrɑpɪkəl ˈaɪlənd./"
      },
      {
        "id": 258,
        "startTime": 579.58,
        "endTime": 582.98,
        "en_text": "(narrator): This is a tropical island!",
        "vi_text": "(người kể chuyện): Đây là một hòn đảo nhiệt đới!",
        "ipa": "/(ˈnɛreɪtər): ðɪs ɪz ə ˈtrɑpɪkəl ˈaɪlənd!/"
      },
      {
        "id": 259,
        "startTime": 584.28,
        "endTime": 586.59,
        "en_text": "- Welcome to our island!",
        "vi_text": "- Chào mừng đến với hòn đảo của chúng tôi!",
        "ipa": "/ ˈwɛlkəm tɪ ɑr ˈaɪlənd!/"
      },
      {
        "id": 260,
        "startTime": 586.62,
        "endTime": 588.25,
        "en_text": "- Oh! How wonderful!",
        "vi_text": "- Ồ! Thật tuyệt vời!",
        "ipa": "/ oʊ! haʊ ˈwəndərfəl!/"
      },
      {
        "id": 261,
        "startTime": 588.25,
        "endTime": 590.76,
        "en_text": "- This is rather pleasant!",
        "vi_text": "- Điều này khá dễ chịu!",
        "ipa": "/ ðɪs ɪz ˈrəðər ˈplɛzənt!/"
      },
      {
        "id": 262,
        "startTime": 590.76,
        "endTime": 593.16,
        "en_text": "- Thank you very much! (George snorts)",
        "vi_text": "- Cảm ơn rất nhiều! (George khịt mũi)",
        "ipa": "/ θæŋk ju ˈvɛri məʧ! (ʤɔrʤ snɔrts)/"
      },
      {
        "id": 263,
        "startTime": 593.16,
        "endTime": 596.6,
        "en_text": "(narrator): This is the tropical island market place.",
        "vi_text": "(người kể chuyện): Đây là khu chợ đảo nhiệt đới.",
        "ipa": "/(ˈnɛreɪtər): ðɪs ɪz ðə ˈtrɑpɪkəl ˈaɪlənd ˈmɑrkɪt pleɪs./"
      },
      {
        "id": 264,
        "startTime": 596.6,
        "endTime": 598.86,
        "en_text": "- Can we buy something, Granny?",
        "vi_text": "- Chúng ta có thể mua gì được không, bà?",
        "ipa": "/ kən wi baɪ ˈsəmθɪŋ, ˈgræni?/"
      },
      {
        "id": 265,
        "startTime": 598.9,
        "endTime": 600.27,
        "en_text": "- I don't see why not!",
        "vi_text": "- Tôi không hiểu tại sao lại không!",
        "ipa": "/ aɪ doʊnt si waɪ nɑt!/"
      },
      {
        "id": 266,
        "startTime": 600.27,
        "endTime": 603.2,
        "en_text": "(narrator): Grandpa Pig has found a colourful shirt.",
        "vi_text": "(người kể chuyện): Ông nội Heo đã tìm được một chiếc áo nhiều màu sắc.",
        "ipa": "/(ˈnɛreɪtər): ˈgrændˌpɑ pɪg həz faʊnd ə colourful* ʃərt./"
      },
      {
        "id": 267,
        "startTime": 603.2,
        "endTime": 605.67,
        "en_text": "- This looks rather fun!",
        "vi_text": "- Chuyện này có vẻ khá thú vị đấy!",
        "ipa": "/ ðɪs lʊks ˈrəðər fən!/"
      },
      {
        "id": 268,
        "startTime": 605.67,
        "endTime": 608.67,
        "en_text": "(narrator): Granny Pig has found a tropical gnome.",
        "vi_text": "(người kể chuyện): Bà nội lợn đã tìm thấy một thần lùn nhiệt đới.",
        "ipa": "/(ˈnɛreɪtər): ˈgræni pɪg həz faʊnd ə ˈtrɑpɪkəl noʊm./"
      },
      {
        "id": 269,
        "startTime": 608.67,
        "endTime": 611.71,
        "en_text": "- And this would look lovely in our garden!",
        "vi_text": "- Và cái này trông sẽ rất đẹp trong khu vườn của chúng ta!",
        "ipa": "/ ənd ðɪs wʊd lʊk ˈləvli ɪn ɑr ˈgɑrdən!/"
      },
      {
        "id": 270,
        "startTime": 611.71,
        "endTime": 613.11,
        "en_text": "(upbeat music)",
        "vi_text": "(nhạc sôi động)",
        "ipa": "/(ˈəpˌbit mˈjuzɪk)/"
      },
      {
        "id": 271,
        "startTime": 613.11,
        "endTime": 614.91,
        "en_text": "(gasps) - Grandpa?",
        "vi_text": "(thở hổn hển) - Ông nội?",
        "ipa": "/(gæsps)  ˈgrændˌpɑ?/"
      },
      {
        "id": 272,
        "startTime": 614.91,
        "endTime": 617.68,
        "en_text": "Can I have this dancing dolly, please?",
        "vi_text": "Cho tôi xin con búp bê nhảy múa này được không?",
        "ipa": "/kən aɪ hæv ðɪs ˈdænsɪŋ ˈdɑli, pliz?/"
      },
      {
        "id": 273,
        "startTime": 617.68,
        "endTime": 620.02,
        "en_text": "- Of course you can, Peppa!",
        "vi_text": "- Tất nhiên là được rồi, Peppa!",
        "ipa": "/ əv kɔrs ju kən, peppa*!/"
      },
      {
        "id": 274,
        "startTime": 620.05,
        "endTime": 622.92,
        "en_text": "(giggles, snorts)",
        "vi_text": "(cười khúc khích, khịt mũi)",
        "ipa": "/(ˈgɪgəlz, snɔrts)/"
      },
      {
        "id": 275,
        "startTime": 622.92,
        "endTime": 625.62,
        "en_text": "- George wants that little guitar!",
        "vi_text": "- George muốn cây ghi-ta nhỏ đó!",
        "ipa": "/ ʤɔrʤ wɔnts ðət ˈlɪtəl gɪˈtɑr!/"
      },
      {
        "id": 276,
        "startTime": 625.66,
        "endTime": 627.99,
        "en_text": "- This is actually a ukulele.",
        "vi_text": "- Thực chất đây là đàn ukulele.",
        "ipa": "/ ðɪs ɪz ˈæˌkʧuəli ə ˌjukəˈleɪli./"
      },
      {
        "id": 277,
        "startTime": 627.99,
        "endTime": 630.8,
        "en_text": "It is a very calming musical instrument",
        "vi_text": "Nó là một nhạc cụ rất êm dịu",
        "ipa": "/ɪt ɪz ə ˈvɛri ˈkɑmɪŋ mˈjuzɪkəl ˈɪnstrəmənt/"
      },
      {
        "id": 278,
        "startTime": 630.8,
        "endTime": 632.63,
        "en_text": "when played correctly.",
        "vi_text": "khi chơi đúng.",
        "ipa": "/wɪn pleɪd kərˈɛktli./"
      },
      {
        "id": 279,
        "startTime": 632.63,
        "endTime": 633.57,
        "en_text": "(gentle strumming)",
        "vi_text": "(đánh đàn nhẹ nhàng)",
        "ipa": "/(ˈʤɛnəl ˈstrəmɪŋ)/"
      },
      {
        "id": 280,
        "startTime": 633.57,
        "endTime": 635.84,
        "en_text": "- Yukky-lay-lee! (giggling)",
        "vi_text": "- Yukky-lay-lee! (cười khúc khích)",
        "ipa": "/ yukky-lay-lee*! (ˈgɪgəlɪŋ)/"
      },
      {
        "id": 281,
        "startTime": 635.84,
        "endTime": 637.9,
        "en_text": "- Yes, please. We'll take it!",
        "vi_text": "- Vâng, làm ơn. Chúng tôi sẽ lấy nó!",
        "ipa": "/ jɛs, pliz. wɪl teɪk ɪt!/"
      },
      {
        "id": 282,
        "startTime": 637.94,
        "endTime": 639.0,
        "en_text": "(giggles)",
        "vi_text": "(cười khúc khích)",
        "ipa": "/(ˈgɪgəlz)/"
      },
      {
        "id": 283,
        "startTime": 639.0,
        "endTime": 641.61,
        "en_text": "(vigorous, unpleasant strumming)",
        "vi_text": "(tiếng gảy đàn mạnh mẽ, khó chịu)",
        "ipa": "/(ˈvɪgərəs, ənˈplɛzənt ˈstrəmɪŋ)/"
      },
      {
        "id": 284,
        "startTime": 641.61,
        "endTime": 644.08,
        "en_text": "Uh... lovely.",
        "vi_text": "Ờ... đáng yêu.",
        "ipa": "/ə... ˈləvli./"
      },
      {
        "id": 285,
        "startTime": 644.08,
        "endTime": 646.75,
        "en_text": "- Hello, Peppa! - Hello, Rohan!",
        "vi_text": "- Chào Peppa! - Chào Rohan!",
        "ipa": "/ hɛˈloʊ, peppa*!  hɛˈloʊ, roʊən!/"
      },
      {
        "id": 286,
        "startTime": 646.78,
        "endTime": 649.85,
        "en_text": "- I got a little wooden box with holes in it.",
        "vi_text": "- Tôi có một cái hộp gỗ nhỏ có lỗ bên trong.",
        "ipa": "/ aɪ gɑt ə ˈlɪtəl ˈwʊdən bɑks wɪθ hoʊlz ɪn ɪt./"
      },
      {
        "id": 287,
        "startTime": 649.85,
        "endTime": 651.32,
        "en_text": "- Oh. - It's a present",
        "vi_text": "- Ồ. - Đó là một món quà",
        "ipa": "/ oʊ.  ɪts ə ˈprɛzənt/"
      },
      {
        "id": 288,
        "startTime": 651.32,
        "endTime": 653.79,
        "en_text": "for my pet beetle, Bernard.",
        "vi_text": "cho con bọ cưng của tôi, Bernard.",
        "ipa": "/fər maɪ pɛt ˈbitəl, ˈbərnərd./"
      },
      {
        "id": 289,
        "startTime": 653.79,
        "endTime": 655.99,
        "en_text": "(gasps) - I need to get a present",
        "vi_text": "(thở hổn hển) - Tôi cần có một món quà",
        "ipa": "/(gæsps)  aɪ nid tɪ gɪt ə ˈprɛzənt/"
      },
      {
        "id": 290,
        "startTime": 655.99,
        "endTime": 658.22,
        "en_text": "for Goldie, my pet fish!",
        "vi_text": "cho Goldie, con cá cưng của tôi!",
        "ipa": "/fər ˈgoʊldi, maɪ pɛt fɪʃ!/"
      },
      {
        "id": 291,
        "startTime": 658.26,
        "endTime": 659.72,
        "en_text": "- What does Goldie like?",
        "vi_text": "- Goldie thích gì?",
        "ipa": "/ wət dɪz ˈgoʊldi laɪk?/"
      },
      {
        "id": 292,
        "startTime": 659.73,
        "endTime": 663.66,
        "en_text": "- She likes swimming around and going like this!",
        "vi_text": "- Cô ấy thích bơi lội và đi như thế này!",
        "ipa": "/ ʃi laɪks sˈwɪmɪŋ əraʊnd ənd goʊɪŋ laɪk ðɪs!/"
      },
      {
        "id": 293,
        "startTime": 664.83,
        "endTime": 668.27,
        "en_text": "- Maybe Goldie would like a cuddly whale?",
        "vi_text": "- Có lẽ Goldie muốn một con cá voi âu yếm?",
        "ipa": "/ ˈmeɪbi ˈgoʊldi wʊd laɪk ə ˈkədli weɪl?/"
      },
      {
        "id": 294,
        "startTime": 668.27,
        "endTime": 669.64,
        "en_text": "- Yes! (snorts)",
        "vi_text": "- Đúng! (khịt mũi)",
        "ipa": "/ jɛs! (snɔrts)/"
      },
      {
        "id": 295,
        "startTime": 669.63,
        "endTime": 672.27,
        "en_text": "Can we get this for Goldie the Fish?",
        "vi_text": "Chúng ta có thể lấy cái này cho Goldie the Fish không?",
        "ipa": "/kən wi gɪt ðɪs fər ˈgoʊldi ðə fɪʃ?/"
      },
      {
        "id": 296,
        "startTime": 672.27,
        "endTime": 674.01,
        "en_text": "- That's a kind thought, Peppa.",
        "vi_text": "- Ý nghĩ đó thật tử tế, Peppa.",
        "ipa": "/ ðæts ə kaɪnd θɔt, peppa*./"
      },
      {
        "id": 297,
        "startTime": 674.47,
        "endTime": 677.28,
        "en_text": "- Hello, Grandpa Pig!",
        "vi_text": "- Chào ông nội lợn!",
        "ipa": "/ hɛˈloʊ, ˈgrændˌpɑ pɪg!/"
      },
      {
        "id": 298,
        "startTime": 677.28,
        "endTime": 680.11,
        "en_text": "- Doing a bit of tourist shopping, are we?",
        "vi_text": "- Chúng ta đang đi mua sắm du lịch một chút phải không?",
        "ipa": "/ duɪŋ ə bɪt əv ˈtʊrɪst ˈʃɑpɪŋ, ər wi?/"
      },
      {
        "id": 299,
        "startTime": 680.11,
        "endTime": 682.68,
        "en_text": "- Oh. Uh... yes.",
        "vi_text": "- Ồ. Ờ... vâng.",
        "ipa": "/ oʊ. ə... jɛs./"
      },
      {
        "id": 300,
        "startTime": 682.68,
        "endTime": 684.82,
        "en_text": "- Oh! So are we!",
        "vi_text": "- Ồ! Chúng tôi cũng vậy!",
        "ipa": "/ oʊ! soʊ ər wi!/"
      },
      {
        "id": 301,
        "startTime": 684.85,
        "endTime": 686.22,
        "en_text": "Can't resist!",
        "vi_text": "Không thể cưỡng lại được!",
        "ipa": "/kænt rɪˈzɪst!/"
      },
      {
        "id": 302,
        "startTime": 686.22,
        "endTime": 689.65,
        "en_text": "- I think we have to go and make a phone call now.",
        "vi_text": "- Tôi nghĩ chúng ta phải đi gọi điện ngay bây giờ.",
        "ipa": "/ aɪ θɪŋk wi hæv tɪ goʊ ənd meɪk ə foʊn kɔl naʊ./"
      },
      {
        "id": 303,
        "startTime": 689.65,
        "endTime": 691.79,
        "en_text": "- I need to speak to Goldie!",
        "vi_text": "- Tôi cần nói chuyện với Goldie!",
        "ipa": "/ aɪ nid tɪ spik tɪ ˈgoʊldi!/"
      },
      {
        "id": 304,
        "startTime": 691.79,
        "endTime": 693.86,
        "en_text": "- Toodle pip! - Bye!",
        "vi_text": "- Toodle pip! - Tạm biệt!",
        "ipa": "/ toodle* pɪp!  baɪ!/"
      },
      {
        "id": 305,
        "startTime": 693.89,
        "endTime": 696.8,
        "en_text": "(narrator): Here is the tropical island telephone.",
        "vi_text": "(người kể chuyện): Đây là điện thoại của hòn đảo nhiệt đới.",
        "ipa": "/(ˈnɛreɪtər): hir ɪz ðə ˈtrɑpɪkəl ˈaɪlənd ˈtɛləˌfoʊn./"
      },
      {
        "id": 306,
        "startTime": 696.8,
        "endTime": 698.83,
        "en_text": "- I wonder what everyone on the other side of the world",
        "vi_text": "- Tôi tự hỏi mọi người ở bên kia thế giới thì sao?",
        "ipa": "/ aɪ ˈwəndər wət ˈɛvriˌwən ɔn ðə ˈəðər saɪd əv ðə wərld/"
      },
      {
        "id": 307,
        "startTime": 698.83,
        "endTime": 700.17,
        "en_text": "is doing now.",
        "vi_text": "đang làm bây giờ.",
        "ipa": "/ɪz duɪŋ naʊ./"
      },
      {
        "id": 308,
        "startTime": 700.17,
        "endTime": 702.87,
        "en_text": "(phone ringing)",
        "vi_text": "(điện thoại đổ chuông)",
        "ipa": "/(foʊn ˈrɪŋɪŋ)/"
      },
      {
        "id": 309,
        "startTime": 703.74,
        "endTime": 706.74,
        "en_text": "- Uh, hello? Who is this?",
        "vi_text": "- Ơ, xin chào? Đây là ai?",
        "ipa": "/ ə, hɛˈloʊ? hu ɪz ðɪs?/"
      },
      {
        "id": 310,
        "startTime": 706.74,
        "endTime": 708.67,
        "en_text": "- It's me, Daddy!",
        "vi_text": "- Là con đây bố!",
        "ipa": "/ ɪts mi, ˈdædi!/"
      },
      {
        "id": 311,
        "startTime": 708.67,
        "endTime": 711.08,
        "en_text": "I'm on holiday, remember?!",
        "vi_text": "Tôi đang đi nghỉ, nhớ chứ?!",
        "ipa": "/əm ɔn ˈhɑlɪˌdeɪ, rɪˈmɛmbər?!/"
      },
      {
        "id": 312,
        "startTime": 711.08,
        "endTime": 714.08,
        "en_text": "- Oh, Peppa! How's the holiday?",
        "vi_text": "- Ôi, Peppa! Kỳ nghỉ thế nào?",
        "ipa": "/ oʊ, peppa*! haʊz ðə ˈhɑlɪˌdeɪ?/"
      },
      {
        "id": 313,
        "startTime": 714.08,
        "endTime": 715.72,
        "en_text": "- It is very nice.",
        "vi_text": "- Nó rất đẹp.",
        "ipa": "/ ɪt ɪz ˈvɛri nis./"
      },
      {
        "id": 314,
        "startTime": 715.72,
        "endTime": 717.95,
        "en_text": "Can I speak to Goldie, please?",
        "vi_text": "Làm ơn cho tôi nói chuyện với Goldie được không?",
        "ipa": "/kən aɪ spik tɪ ˈgoʊldi, pliz?/"
      },
      {
        "id": 315,
        "startTime": 718.35,
        "endTime": 720.29,
        "en_text": "- It's Peppa, for you. (snorts)",
        "vi_text": "- Peppa đây, dành cho bạn. (khịt mũi)",
        "ipa": "/ ɪts peppa*, fər ju. (snɔrts)/"
      },
      {
        "id": 316,
        "startTime": 720.29,
        "endTime": 721.99,
        "en_text": "(Peppa): Hello, Goldie!",
        "vi_text": "(Peppa): Xin chào Goldie!",
        "ipa": "/(peppa*): hɛˈloʊ, ˈgoʊldi!/"
      },
      {
        "id": 317,
        "startTime": 721.99,
        "endTime": 724.79,
        "en_text": "I'm on a big boat with a pirate",
        "vi_text": "Tôi đang ở trên một chiếc thuyền lớn với một tên cướp biển",
        "ipa": "/əm ɔn ə bɪg boʊt wɪθ ə ˈpaɪrət/"
      },
      {
        "id": 318,
        "startTime": 724.79,
        "endTime": 727.99,
        "en_text": "and a mermaid, and we saw a whale!",
        "vi_text": "và một nàng tiên cá, và chúng tôi đã nhìn thấy một con cá voi!",
        "ipa": "/ənd ə ˈmərˌmeɪd, ənd wi sɔ ə weɪl!/"
      },
      {
        "id": 319,
        "startTime": 727.99,
        "endTime": 729.2,
        "en_text": "And...",
        "vi_text": "Và...",
        "ipa": "/ənd.../"
      },
      {
        "id": 320,
        "startTime": 729.2,
        "endTime": 730.86,
        "en_text": "Do you remember me?",
        "vi_text": "Bạn có nhớ tôi không?",
        "ipa": "/du ju rɪˈmɛmbər mi?/"
      },
      {
        "id": 321,
        "startTime": 731.8,
        "endTime": 732.67,
        "en_text": "(giggling)",
        "vi_text": "(cười khúc khích)",
        "ipa": "/(ˈgɪgəlɪŋ)/"
      },
      {
        "id": 322,
        "startTime": 732.7,
        "endTime": 733.83,
        "en_text": "Good!",
        "vi_text": "Tốt!",
        "ipa": "/gʊd!/"
      },
      {
        "id": 323,
        "startTime": 733.83,
        "endTime": 735.63,
        "en_text": "- Are you all enjoying yourselves?",
        "vi_text": "- Mọi người có thấy vui không?",
        "ipa": "/ ər ju ɔl ˌɛnˈʤɔɪɪŋ ˈjɔrsɛlvz?/"
      },
      {
        "id": 324,
        "startTime": 735.63,
        "endTime": 737.67,
        "en_text": "- Yes, Mummy! Here is George.",
        "vi_text": "- Vâng, mẹ ơi! Đây là George.",
        "ipa": "/ jɛs, ˈməmi! hir ɪz ʤɔrʤ./"
      },
      {
        "id": 325,
        "startTime": 737.67,
        "endTime": 739.1,
        "en_text": "(Mummy Pig): George, hello!",
        "vi_text": "(Mẹ Lợn): George, xin chào!",
        "ipa": "/(ˈməmi pɪg): ʤɔrʤ, hɛˈloʊ!/"
      },
      {
        "id": 326,
        "startTime": 739.14,
        "endTime": 741.37,
        "en_text": "What's the best thing about your holiday?",
        "vi_text": "Điều tuyệt vời nhất trong kỳ nghỉ của bạn là gì?",
        "ipa": "/wəts ðə bɛst θɪŋ əˈbaʊt jʊr ˈhɑlɪˌdeɪ?/"
      },
      {
        "id": 327,
        "startTime": 741.37,
        "endTime": 742.84,
        "en_text": "- Tay-toe!",
        "vi_text": "- Tay-toe!",
        "ipa": "/ tay-toe*!/"
      },
      {
        "id": 328,
        "startTime": 742.84,
        "endTime": 744.28,
        "en_text": "(both): Potato?",
        "vi_text": "(cả hai): Khoai tây?",
        "ipa": "/(boʊθ): pəˈteɪˌtoʊ?/"
      },
      {
        "id": 329,
        "startTime": 745.68,
        "endTime": 746.91,
        "en_text": "(narrator): Peppa and George",
        "vi_text": "(người kể chuyện): Peppa và George",
        "ipa": "/(ˈnɛreɪtər): peppa* ənd ʤɔrʤ/"
      },
      {
        "id": 330,
        "startTime": 746.91,
        "endTime": 749.05,
        "en_text": "are going back to the cruise ship.",
        "vi_text": "đang quay trở lại tàu du lịch.",
        "ipa": "/ər goʊɪŋ bæk tɪ ðə kruz ʃɪp./"
      },
      {
        "id": 331,
        "startTime": 749.05,
        "endTime": 752.75,
        "en_text": "- Well, I think you will all agree, that was splendid!",
        "vi_text": "- Chà, tôi nghĩ tất cả các bạn sẽ đồng ý, điều đó thật tuyệt vời!",
        "ipa": "/ wɛl, aɪ θɪŋk ju wɪl ɔl əˈgri, ðət wɑz ˈsplɛndɪd!/"
      },
      {
        "id": 332,
        "startTime": 752.75,
        "endTime": 754.72,
        "en_text": "- Yes, Granny Pig!",
        "vi_text": "- Vâng, Bà Heo!",
        "ipa": "/ jɛs, ˈgræni pɪg!/"
      },
      {
        "id": 333,
        "startTime": 754.72,
        "endTime": 756.92,
        "en_text": "- Nothing else we do today",
        "vi_text": "- Hôm nay chúng ta không làm gì khác",
        "ipa": "/ ˈnəθɪŋ ɛls wi du təˈdeɪ/"
      },
      {
        "id": 334,
        "startTime": 756.92,
        "endTime": 759.33,
        "en_text": "could top that experience!",
        "vi_text": "có thể đứng đầu trải nghiệm đó!",
        "ipa": "/kʊd tɔp ðət ɪkˈspɪriəns!/"
      },
      {
        "id": 335,
        "startTime": 759.33,
        "endTime": 760.63,
        "en_text": "- Tay-toe!",
        "vi_text": "- Tay-toe!",
        "ipa": "/ tay-toe*!/"
      },
      {
        "id": 336,
        "startTime": 760.63,
        "endTime": 763.8,
        "en_text": "- Except for a ride-on potato, of course.",
        "vi_text": "- Tất nhiên là ngoại trừ một củ khoai tây cưỡi ngựa.",
        "ipa": "/ ɪkˈsɛpt fər ə ride-on* pəˈteɪˌtoʊ, əv kɔrs./"
      },
      {
        "id": 337,
        "startTime": 763.8,
        "endTime": 767.43,
        "en_text": "- Hello, Granny Pig! What can I sell you today?",
        "vi_text": "- Chào bà lợn! Hôm nay tôi có thể bán gì cho bạn?",
        "ipa": "/ hɛˈloʊ, ˈgræni pɪg! wət kən aɪ sɛl ju təˈdeɪ?/"
      },
      {
        "id": 338,
        "startTime": 767.43,
        "endTime": 769.03,
        "en_text": "- Mr. Fox? (snorts)",
        "vi_text": "- Ông Cáo à? (khịt mũi)",
        "ipa": "/ ˈmɪstər. fɑks? (snɔrts)/"
      },
      {
        "id": 339,
        "startTime": 769.03,
        "endTime": 770.3,
        "en_text": "What are you doing here?",
        "vi_text": "Bạn đang làm gì ở đây?",
        "ipa": "/wət ər ju duɪŋ hir?/"
      },
      {
        "id": 340,
        "startTime": 770.34,
        "endTime": 772.07,
        "en_text": "- I've got a shop!",
        "vi_text": "- Tôi có một cửa hàng!",
        "ipa": "/ aɪv gɑt ə ʃɑp!/"
      },
      {
        "id": 341,
        "startTime": 772.07,
        "endTime": 774.27,
        "en_text": "There are a lot of people on board this ship",
        "vi_text": "Trên tàu này có rất nhiều người",
        "ipa": "/ðɛr ər ə lɔt əv ˈpipəl ɔn bɔrd ðɪs ʃɪp/"
      },
      {
        "id": 342,
        "startTime": 774.27,
        "endTime": 775.47,
        "en_text": "who need things!",
        "vi_text": "ai cần đồ!",
        "ipa": "/hu nid θɪŋz!/"
      },
      {
        "id": 343,
        "startTime": 775.47,
        "endTime": 778.34,
        "en_text": "Like an egg on a stick, a top hat,",
        "vi_text": "Như quả trứng trên que, chiếc mũ đội đầu,",
        "ipa": "/laɪk ən ɛg ɔn ə stɪk, ə tɔp hæt,/"
      },
      {
        "id": 344,
        "startTime": 778.38,
        "endTime": 779.98,
        "en_text": "or a pirate beard!",
        "vi_text": "hoặc một bộ râu cướp biển!",
        "ipa": "/ər ə ˈpaɪrət bɪrd!/"
      },
      {
        "id": 345,
        "startTime": 779.98,
        "endTime": 782.11,
        "en_text": "- Oh. That's just what I was looking for!",
        "vi_text": "- Ồ. Đó chỉ là những gì tôi đang tìm kiếm!",
        "ipa": "/ oʊ. ðæts ʤɪst wət aɪ wɑz ˈlʊkɪŋ fər!/"
      },
      {
        "id": 346,
        "startTime": 782.11,
        "endTime": 783.32,
        "en_text": "- See what I mean?",
        "vi_text": "- Hiểu ý tôi chứ?",
        "ipa": "/ si wət aɪ min?/"
      },
      {
        "id": 347,
        "startTime": 783.32,
        "endTime": 785.75,
        "en_text": "- We bought some things too!",
        "vi_text": "- Chúng tôi cũng mua vài thứ!",
        "ipa": "/ wi bɔt səm θɪŋz tu!/"
      },
      {
        "id": 348,
        "startTime": 785.75,
        "endTime": 786.95,
        "en_text": "- So I see!",
        "vi_text": "- Vậy là tôi hiểu rồi!",
        "ipa": "/ soʊ aɪ si!/"
      },
      {
        "id": 349,
        "startTime": 786.95,
        "endTime": 789.75,
        "en_text": "Well, if you need anything else, come to me.",
        "vi_text": "Vâng, nếu bạn cần bất cứ điều gì khác, hãy đến với tôi.",
        "ipa": "/wɛl, ɪf ju nid ˈɛniˌθɪŋ ɛls, kəm tɪ mi./"
      },
      {
        "id": 350,
        "startTime": 789.75,
        "endTime": 792.92,
        "en_text": "- I know what I need... some food!",
        "vi_text": "- Tôi biết tôi cần gì... một ít đồ ăn!",
        "ipa": "/ aɪ noʊ wət aɪ nid... səm fud!/"
      },
      {
        "id": 351,
        "startTime": 792.92,
        "endTime": 794.36,
        "en_text": "Who else is hungry?",
        "vi_text": "Còn ai đói nữa không?",
        "ipa": "/hu ɛls ɪz ˈhəŋgri?/"
      },
      {
        "id": 352,
        "startTime": 794.36,
        "endTime": 795.86,
        "en_text": "- Me, me, me! - Yeah!",
        "vi_text": "- Tôi, tôi, tôi! - Vâng!",
        "ipa": "/ mi, mi, mi!  jæ!/"
      },
      {
        "id": 353,
        "startTime": 795.89,
        "endTime": 797.96,
        "en_text": "(narrator): Peppa and George are eating dinner",
        "vi_text": "(người kể chuyện): Peppa và George đang ăn tối",
        "ipa": "/(ˈnɛreɪtər): peppa* ənd ʤɔrʤ ər ˈitɪŋ ˈdɪnər/"
      },
      {
        "id": 354,
        "startTime": 797.96,
        "endTime": 799.66,
        "en_text": "on the deck of the cruise ship.",
        "vi_text": "trên boong tàu du lịch.",
        "ipa": "/ɔn ðə dɛk əv ðə kruz ʃɪp./"
      },
      {
        "id": 355,
        "startTime": 799.7,
        "endTime": 801.03,
        "en_text": "(slurping)",
        "vi_text": "(húp xì xụp)",
        "ipa": "/(slurping*)/"
      },
      {
        "id": 356,
        "startTime": 801.03,
        "endTime": 802.67,
        "en_text": "(Peppa and George): Pigetti!",
        "vi_text": "(Peppa và George): Pigetti!",
        "ipa": "/(peppa* ənd ʤɔrʤ): pigetti*!/"
      },
      {
        "id": 357,
        "startTime": 802.67,
        "endTime": 804.2,
        "en_text": "(all laugh)",
        "vi_text": "(tất cả cười)",
        "ipa": "/(ɔl læf)/"
      },
      {
        "id": 358,
        "startTime": 804.2,
        "endTime": 806.07,
        "en_text": "(narrator): Tomorrow, the holiday cruise ship",
        "vi_text": "(người kể chuyện): Ngày mai, chuyến du thuyền nghỉ lễ",
        "ipa": "/(ˈnɛreɪtər): təˈmɑˌroʊ, ðə ˈhɑlɪˌdeɪ kruz ʃɪp/"
      },
      {
        "id": 359,
        "startTime": 806.07,
        "endTime": 808.44,
        "en_text": "will take Peppa and George home.",
        "vi_text": "sẽ đưa Peppa và George về nhà.",
        "ipa": "/wɪl teɪk peppa* ənd ʤɔrʤ hoʊm./"
      },
      {
        "id": 360,
        "startTime": 808.47,
        "endTime": 811.31,
        "en_text": "(Peppa): Sailing Home!",
        "vi_text": "(Peppa): Đi thuyền về nhà!",
        "ipa": "/(peppa*): ˈseɪlɪŋ hoʊm!/"
      },
      {
        "id": 361,
        "startTime": 811.31,
        "endTime": 812.81,
        "en_text": "(narrator): It is the last day",
        "vi_text": "(người kể chuyện): Hôm nay là ngày cuối cùng",
        "ipa": "/(ˈnɛreɪtər): ɪt ɪz ðə læst deɪ/"
      },
      {
        "id": 362,
        "startTime": 812.81,
        "endTime": 815.78,
        "en_text": "of Peppa and George's cruise ship holiday.",
        "vi_text": "về kỳ nghỉ trên tàu du lịch của Peppa và George.",
        "ipa": "/əv peppa* ənd ˈʤɔrʤɪz kruz ʃɪp ˈhɑlɪˌdeɪ./"
      },
      {
        "id": 363,
        "startTime": 815.78,
        "endTime": 819.55,
        "en_text": "- I don't want to go home yet, Granny.",
        "vi_text": "- Con chưa muốn về nhà đâu bà ạ.",
        "ipa": "/ aɪ doʊnt wɔnt tɪ goʊ hoʊm jɛt, ˈgræni./"
      },
      {
        "id": 364,
        "startTime": 819.55,
        "endTime": 822.39,
        "en_text": "- Think how nice it will be to see Mummy and Daddy!",
        "vi_text": "- Hãy nghĩ xem sẽ vui biết bao khi được gặp lại Bố Mẹ!",
        "ipa": "/ θɪŋk haʊ nis ɪt wɪl bi tɪ si ˈməmi ənd ˈdædi!/"
      },
      {
        "id": 365,
        "startTime": 822.39,
        "endTime": 825.12,
        "en_text": "(gasps) - And Goldie the Fish!",
        "vi_text": "(thở hổn hển) - Và Cá Goldie!",
        "ipa": "/(gæsps)  ənd ˈgoʊldi ðə fɪʃ!/"
      },
      {
        "id": 366,
        "startTime": 825.12,
        "endTime": 827.03,
        "en_text": "- But we're not home just yet!",
        "vi_text": "- Nhưng chúng ta chưa về nhà!",
        "ipa": "/ bət wɪr nɑt hoʊm ʤɪst jɛt!/"
      },
      {
        "id": 367,
        "startTime": 827.03,
        "endTime": 830.16,
        "en_text": "What shall we do with our last day at sea?",
        "vi_text": "Chúng ta sẽ làm gì trong ngày cuối cùng trên biển?",
        "ipa": "/wət ʃæl wi du wɪθ ɑr læst deɪ æt si?/"
      },
      {
        "id": 368,
        "startTime": 830.16,
        "endTime": 831.63,
        "en_text": "- Tay-toe! (snorts)",
        "vi_text": "- Tay-toe! (khịt mũi)",
        "ipa": "/ tay-toe*! (snɔrts)/"
      },
      {
        "id": 369,
        "startTime": 831.63,
        "endTime": 834.77,
        "en_text": "(narrator): George wants to go on the ride-on potato.",
        "vi_text": "(người kể chuyện): George muốn cưỡi khoai tây.",
        "ipa": "/(ˈnɛreɪtər): ʤɔrʤ wɔnts tɪ goʊ ɔn ðə ride-on* pəˈteɪˌtoʊ./"
      },
      {
        "id": 370,
        "startTime": 834.77,
        "endTime": 838.1,
        "en_text": "- Shall we go to the mermaid splash pool again, Peppa?",
        "vi_text": "- Chúng ta tới bể bơi nàng tiên cá lần nữa nhé Peppa?",
        "ipa": "/ ʃæl wi goʊ tɪ ðə ˈmərˌmeɪd splæʃ pul əˈgɛn, peppa*?/"
      },
      {
        "id": 371,
        "startTime": 838.1,
        "endTime": 840.07,
        "en_text": "(snorts) - Okay, Granny!",
        "vi_text": "(khịt mũi) - Được rồi, bà ơi!",
        "ipa": "/(snɔrts)  ˌoʊˈkeɪ, ˈgræni!/"
      },
      {
        "id": 372,
        "startTime": 840.07,
        "endTime": 841.14,
        "en_text": "(children laughing)",
        "vi_text": "(trẻ con cười)",
        "ipa": "/(ˈʧɪldrən ˈlæfɪŋ)/"
      },
      {
        "id": 373,
        "startTime": 841.14,
        "endTime": 842.54,
        "en_text": "Hello, Rohan!",
        "vi_text": "Xin chào, Rohan!",
        "ipa": "/hɛˈloʊ, roʊən!/"
      },
      {
        "id": 374,
        "startTime": 842.54,
        "endTime": 844.71,
        "en_text": "We're going home today.",
        "vi_text": "Hôm nay chúng ta sẽ về nhà.",
        "ipa": "/wɪr goʊɪŋ hoʊm təˈdeɪ./"
      },
      {
        "id": 375,
        "startTime": 844.71,
        "endTime": 846.08,
        "en_text": "- I know.",
        "vi_text": "- Tôi biết.",
        "ipa": "/ aɪ noʊ./"
      },
      {
        "id": 376,
        "startTime": 846.08,
        "endTime": 848.68,
        "en_text": "- Treasure! My treasure!",
        "vi_text": "- Kho báu! Kho báu của tôi!",
        "ipa": "/ ˈtrɛʒər! maɪ ˈtrɛʒər!/"
      },
      {
        "id": 377,
        "startTime": 848.68,
        "endTime": 850.82,
        "en_text": "- It's Pirate Pete!",
        "vi_text": "- Đó là Cướp biển Pete!",
        "ipa": "/ ɪts ˈpaɪrət pit!/"
      },
      {
        "id": 378,
        "startTime": 850.82,
        "endTime": 853.19,
        "en_text": "- I've lost my treasure!",
        "vi_text": "- Tôi bị mất kho báu rồi!",
        "ipa": "/ aɪv lɔst maɪ ˈtrɛʒər!/"
      },
      {
        "id": 379,
        "startTime": 853.18,
        "endTime": 855.72,
        "en_text": "Mrs. Mermaid... - Oh no!",
        "vi_text": "Bà Nàng Tiên Cá... - Ôi không!",
        "ipa": "/ˈmɪsɪz. ˈmərˌmeɪd...  oʊ noʊ!/"
      },
      {
        "id": 380,
        "startTime": 855.72,
        "endTime": 858.39,
        "en_text": "- I think she's forgotten where she is!",
        "vi_text": "- Tôi nghĩ cô ấy quên mất mình ở đâu rồi!",
        "ipa": "/ aɪ θɪŋk ʃiz fərˈgɑtən wɛr ʃi ɪz!/"
      },
      {
        "id": 381,
        "startTime": 858.39,
        "endTime": 860.33,
        "en_text": "- Memory like a fish, eh?",
        "vi_text": "- Trí nhớ như một con cá phải không?",
        "ipa": "/ ˈmɛməri laɪk ə fɪʃ, ɛ?/"
      },
      {
        "id": 382,
        "startTime": 860.33,
        "endTime": 863.06,
        "en_text": "- I might never see her again!",
        "vi_text": "- Có lẽ tôi sẽ không bao giờ gặp lại cô ấy nữa!",
        "ipa": "/ aɪ maɪt ˈnɛvər si hər əˈgɛn!/"
      },
      {
        "id": 383,
        "startTime": 863.06,
        "endTime": 866.1,
        "en_text": "- Can you not use your magic box to get her back?",
        "vi_text": "- Bạn có thể không sử dụng hộp ma thuật của mình để đưa cô ấy trở lại được không?",
        "ipa": "/ kən ju nɑt juz jʊr ˈmæʤɪk bɑks tɪ gɪt hər bæk?/"
      },
      {
        "id": 384,
        "startTime": 866.1,
        "endTime": 868.6,
        "en_text": "- Uh... No, it doesn't work like that.",
        "vi_text": "- Ờ... Không, nó không hoạt động như vậy.",
        "ipa": "/ ə... noʊ, ɪt ˈdəzənt wərk laɪk ðət./"
      },
      {
        "id": 385,
        "startTime": 868.6,
        "endTime": 871.44,
        "en_text": "- It worked like that the other night.",
        "vi_text": "- Đêm hôm nọ cũng vậy.",
        "ipa": "/ ɪt wərkt laɪk ðət ðə ˈəðər naɪt./"
      },
      {
        "id": 386,
        "startTime": 871.44,
        "endTime": 872.74,
        "en_text": "(snorts) - Yes!",
        "vi_text": "(khịt mũi) - Vâng!",
        "ipa": "/(snɔrts)  jɛs!/"
      },
      {
        "id": 387,
        "startTime": 872.74,
        "endTime": 873.61,
        "en_text": "Well, um...",
        "vi_text": "À, ừm...",
        "ipa": "/wɛl, əm.../"
      },
      {
        "id": 388,
        "startTime": 873.61,
        "endTime": 875.24,
        "en_text": "- Maybe the children",
        "vi_text": "- Có lẽ bọn trẻ",
        "ipa": "/ ˈmeɪbi ðə ˈʧɪldrən/"
      },
      {
        "id": 389,
        "startTime": 875.24,
        "endTime": 877.28,
        "en_text": "can help you find Mrs. Mermaid.",
        "vi_text": "có thể giúp bạn tìm thấy Bà Nàng Tiên Cá.",
        "ipa": "/kən hɛlp ju faɪnd ˈmɪsɪz. ˈmərˌmeɪd./"
      },
      {
        "id": 390,
        "startTime": 877.28,
        "endTime": 878.38,
        "en_text": "(children): Yes!",
        "vi_text": "(trẻ em): Vâng!",
        "ipa": "/(ˈʧɪldrən): jɛs!/"
      },
      {
        "id": 391,
        "startTime": 878.38,
        "endTime": 879.78,
        "en_text": "- Where do you think",
        "vi_text": "- Bạn nghĩ ở đâu?",
        "ipa": "/ wɛr du ju θɪŋk/"
      },
      {
        "id": 392,
        "startTime": 879.78,
        "endTime": 881.75,
        "en_text": "she might be on the ship?",
        "vi_text": "cô ấy có thể ở trên tàu?",
        "ipa": "/ʃi maɪt bi ɔn ðə ʃɪp?/"
      },
      {
        "id": 393,
        "startTime": 881.75,
        "endTime": 884.48,
        "en_text": "- The Dinosaur Café!",
        "vi_text": "- Quán cà phê khủng long!",
        "ipa": "/ ðə ˈdaɪnəˌsɔr café*é!/"
      },
      {
        "id": 394,
        "startTime": 884.88,
        "endTime": 886.82,
        "en_text": "- Hello, Peppa and Rohan!",
        "vi_text": "- Chào Peppa và Rohan!",
        "ipa": "/ hɛˈloʊ, peppa* ənd roʊən!/"
      },
      {
        "id": 395,
        "startTime": 886.82,
        "endTime": 889.32,
        "en_text": "- Is Mrs. Mermaid here?",
        "vi_text": "- Bà Tiên Cá có ở đây không?",
        "ipa": "/ ɪz ˈmɪsɪz. ˈmərˌmeɪd hir?/"
      },
      {
        "id": 396,
        "startTime": 889.32,
        "endTime": 891.79,
        "en_text": "- No, I'm sorry. We're closed now.",
        "vi_text": "- Không, tôi xin lỗi. Bây giờ chúng tôi đã đóng cửa.",
        "ipa": "/ noʊ, əm ˈsɑri. wɪr kloʊzd naʊ./"
      },
      {
        "id": 397,
        "startTime": 891.79,
        "endTime": 893.73,
        "en_text": "It's the end of the trip, you see.",
        "vi_text": "Bạn thấy đấy, thế là kết thúc chuyến đi.",
        "ipa": "/ɪts ðə ɛnd əv ðə trɪp, ju si./"
      },
      {
        "id": 398,
        "startTime": 893.73,
        "endTime": 897.66,
        "en_text": "- Maybe she went to the showtime stage?",
        "vi_text": "- Có lẽ cô ấy đã đến sân khấu biểu diễn?",
        "ipa": "/ ˈmeɪbi ʃi wɛnt tɪ ðə ˈʃoʊˌtaɪm steɪʤ?/"
      },
      {
        "id": 399,
        "startTime": 898.16,
        "endTime": 900.4,
        "en_text": "(narrator): This is the showtime stage.",
        "vi_text": "(người kể chuyện): Đây là sân khấu trình diễn.",
        "ipa": "/(ˈnɛreɪtər): ðɪs ɪz ðə ˈʃoʊˌtaɪm steɪʤ./"
      },
      {
        "id": 400,
        "startTime": 900.4,
        "endTime": 904.14,
        "en_text": "- Hello, Rohan, Peppa? Have you lost something?",
        "vi_text": "- Chào Rohan, Peppa? Bạn đã mất một cái gì đó?",
        "ipa": "/ hɛˈloʊ, roʊən, peppa*? hæv ju lɔst ˈsəmθɪŋ?/"
      },
      {
        "id": 401,
        "startTime": 904.14,
        "endTime": 905.8,
        "en_text": "- We have lost a lady!",
        "vi_text": "- Chúng ta đã mất đi một quý cô!",
        "ipa": "/ wi hæv lɔst ə ˈleɪdi!/"
      },
      {
        "id": 402,
        "startTime": 905.8,
        "endTime": 907.77,
        "en_text": "- Technically, she's half fish.",
        "vi_text": "- Về mặt kỹ thuật thì cô ấy là một nửa cá.",
        "ipa": "/ ˈtɛknɪkəli, ʃiz hæf fɪʃ./"
      },
      {
        "id": 403,
        "startTime": 907.77,
        "endTime": 911.14,
        "en_text": "- I'm afraid there are no ladies or fish in here.",
        "vi_text": "- Tôi e là không có phụ nữ hay cá ở đây.",
        "ipa": "/ əm əˈfreɪd ðɛr ər noʊ ˈleɪdiz ər fɪʃ ɪn hir./"
      },
      {
        "id": 404,
        "startTime": 911.14,
        "endTime": 914.25,
        "en_text": "(gasps) - Maybe she's gone shopping?",
        "vi_text": "(thở hổn hển) - Có lẽ cô ấy đi mua sắm chăng?",
        "ipa": "/(gæsps)  ˈmeɪbi ʃiz gɔn ˈʃɑpɪŋ?/"
      },
      {
        "id": 405,
        "startTime": 914.25,
        "endTime": 916.92,
        "en_text": "(narrator): This is Mr. Fox's shop.",
        "vi_text": "(người kể chuyện): Đây là cửa hàng của ông Fox.",
        "ipa": "/(ˈnɛreɪtər): ðɪs ɪz ˈmɪstər. ˈfɑksəz ʃɑp./"
      },
      {
        "id": 406,
        "startTime": 916.92,
        "endTime": 918.52,
        "en_text": "- Mr. Fox!",
        "vi_text": "- Ông Cáo!",
        "ipa": "/ ˈmɪstər. fɑks!/"
      },
      {
        "id": 407,
        "startTime": 918.52,
        "endTime": 920.15,
        "en_text": "- Hello, Peppa!",
        "vi_text": "- Chào Peppa!",
        "ipa": "/ hɛˈloʊ, peppa*!/"
      },
      {
        "id": 408,
        "startTime": 920.15,
        "endTime": 921.55,
        "en_text": "What are you are looking for?",
        "vi_text": "Bạn đang tìm kiếm cái gì?",
        "ipa": "/wət ər ju ər ˈlʊkɪŋ fər?/"
      },
      {
        "id": 409,
        "startTime": 921.55,
        "endTime": 924.32,
        "en_text": "My shop sells everything!",
        "vi_text": "Cửa hàng của tôi bán tất cả mọi thứ!",
        "ipa": "/maɪ ʃɑp sɛlz ˈɛvriˌθɪŋ!/"
      },
      {
        "id": 410,
        "startTime": 924.32,
        "endTime": 927.29,
        "en_text": "- We are looking for Mrs. Mermaid!",
        "vi_text": "- Chúng tôi đang tìm Bà Nàng tiên cá!",
        "ipa": "/ wi ər ˈlʊkɪŋ fər ˈmɪsɪz. ˈmərˌmeɪd!/"
      },
      {
        "id": 411,
        "startTime": 927.29,
        "endTime": 929.76,
        "en_text": "- She's half lady, half fish.",
        "vi_text": "- Cô ấy nửa tiểu thư, nửa cá.",
        "ipa": "/ ʃiz hæf ˈleɪdi, hæf fɪʃ./"
      },
      {
        "id": 412,
        "startTime": 929.76,
        "endTime": 931.43,
        "en_text": "- Oh... We don't sell that.",
        "vi_text": "- Ồ... Chúng tôi không bán thứ đó.",
        "ipa": "/ oʊ... wi doʊnt sɛl ðət./"
      },
      {
        "id": 413,
        "startTime": 931.43,
        "endTime": 932.93,
        "en_text": "Would a fishing net help?",
        "vi_text": "Lưới đánh cá có giúp ích được không?",
        "ipa": "/wʊd ə ˈfɪʃɪŋ nɛt hɛlp?/"
      },
      {
        "id": 414,
        "startTime": 932.93,
        "endTime": 934.33,
        "en_text": "- No, thank you.",
        "vi_text": "- Không, cảm ơn.",
        "ipa": "/ noʊ, θæŋk ju./"
      },
      {
        "id": 415,
        "startTime": 934.33,
        "endTime": 935.77,
        "en_text": "- Inflatable paperweight?",
        "vi_text": "- Chặn giấy bơm hơi?",
        "ipa": "/ ɪnˈfleɪtəbəl ˈpeɪpərˌweɪt?/"
      },
      {
        "id": 416,
        "startTime": 935.77,
        "endTime": 937.14,
        "en_text": "(squeaking)",
        "vi_text": "(tiếng rít)",
        "ipa": "/(skˈwikɪŋ)/"
      },
      {
        "id": 417,
        "startTime": 937.14,
        "endTime": 938.4,
        "en_text": "- Um, maybe not.",
        "vi_text": "- Ừm, có lẽ là không.",
        "ipa": "/ əm, ˈmeɪbi nɑt./"
      },
      {
        "id": 418,
        "startTime": 938.4,
        "endTime": 940.71,
        "en_text": "Let's carry on searching!",
        "vi_text": "Hãy tiếp tục tìm kiếm!",
        "ipa": "/lɛts ˈkɛri ɔn ˈsərʧɪŋ!/"
      },
      {
        "id": 419,
        "startTime": 941.04,
        "endTime": 944.18,
        "en_text": "(narrator): Mrs. Mermaid is not in the bowling alley...",
        "vi_text": "(người kể chuyện): Bà Nàng tiên cá không có ở sân chơi bowling...",
        "ipa": "/(ˈnɛreɪtər): ˈmɪsɪz. ˈmərˌmeɪd ɪz nɑt ɪn ðə ˈboʊlɪŋ ˈæli.../"
      },
      {
        "id": 420,
        "startTime": 944.18,
        "endTime": 945.84,
        "en_text": "or the bookshop.",
        "vi_text": "hoặc hiệu sách.",
        "ipa": "/ər ðə ˈbʊkˌʃɑp./"
      },
      {
        "id": 421,
        "startTime": 945.84,
        "endTime": 949.25,
        "en_text": "Mrs. Mermaid is not at the soft play.",
        "vi_text": "Bà Tiên Cá không ở chỗ chơi mềm.",
        "ipa": "/ˈmɪsɪz. ˈmərˌmeɪd ɪz nɑt æt ðə sɔft pleɪ./"
      },
      {
        "id": 422,
        "startTime": 950.08,
        "endTime": 954.15,
        "en_text": "Mrs. Mermaid is at the mermaid splash pool!",
        "vi_text": "Bà Nàng tiên cá đang ở bể bơi dành cho nàng tiên cá!",
        "ipa": "/ˈmɪsɪz. ˈmərˌmeɪd ɪz æt ðə ˈmərˌmeɪd splæʃ pul!/"
      },
      {
        "id": 423,
        "startTime": 954.15,
        "endTime": 955.45,
        "en_text": "- There you are!",
        "vi_text": "- Anh đây rồi!",
        "ipa": "/ ðɛr ju ər!/"
      },
      {
        "id": 424,
        "startTime": 955.45,
        "endTime": 959.19,
        "en_text": "- Oh, we've been looking all over the ship for you,",
        "vi_text": "- Ồ, chúng tôi đã tìm kiếm bạn khắp con tàu,",
        "ipa": "/ oʊ, wiv bɪn ˈlʊkɪŋ ɔl ˈoʊvər ðə ʃɪp fər ju,/"
      },
      {
        "id": 425,
        "startTime": 959.19,
        "endTime": 960.56,
        "en_text": "my treasure!",
        "vi_text": "kho báu của tôi!",
        "ipa": "/maɪ ˈtrɛʒər!/"
      },
      {
        "id": 426,
        "startTime": 960.56,
        "endTime": 961.69,
        "en_text": "- Oh, were you?",
        "vi_text": "- Ồ, phải không?",
        "ipa": "/ oʊ, wər ju?/"
      },
      {
        "id": 427,
        "startTime": 961.69,
        "endTime": 963.53,
        "en_text": "I just went to the tropical fruit stall.",
        "vi_text": "Tôi vừa đi đến quầy trái cây nhiệt đới.",
        "ipa": "/aɪ ʤɪst wɛnt tɪ ðə ˈtrɑpɪkəl frut stɔl./"
      },
      {
        "id": 428,
        "startTime": 963.53,
        "endTime": 964.86,
        "en_text": "Would you like some mango?",
        "vi_text": "Bạn có muốn một ít xoài không?",
        "ipa": "/wʊd ju laɪk səm ˈmæŋgoʊ?/"
      },
      {
        "id": 429,
        "startTime": 964.86,
        "endTime": 966.6,
        "en_text": "(all): Yes, please!",
        "vi_text": "(tất cả): Vâng, làm ơn!",
        "ipa": "/(ɔl): jɛs, pliz!/"
      },
      {
        "id": 430,
        "startTime": 966.6,
        "endTime": 967.83,
        "en_text": "(giggling)",
        "vi_text": "(cười khúc khích)",
        "ipa": "/(ˈgɪgəlɪŋ)/"
      },
      {
        "id": 431,
        "startTime": 967.83,
        "endTime": 969.8,
        "en_text": "(children): Mmm, yummy!",
        "vi_text": "(trẻ em): Mmm, ngon quá!",
        "ipa": "/(ˈʧɪldrən): mmm*, ˈjəmi!/"
      },
      {
        "id": 432,
        "startTime": 969.8,
        "endTime": 972.34,
        "en_text": "- Now we're all safe and well.",
        "vi_text": "- Bây giờ tất cả chúng ta đều an toàn và khỏe mạnh.",
        "ipa": "/ naʊ wɪr ɔl seɪf ənd wɛl./"
      },
      {
        "id": 433,
        "startTime": 972.34,
        "endTime": 975.57,
        "en_text": "We can all say goodbye and be on our way.",
        "vi_text": "Tất cả chúng ta có thể nói lời tạm biệt và lên đường.",
        "ipa": "/wi kən ɔl seɪ ˌgʊdˈbaɪ ənd bi ɔn ɑr weɪ./"
      },
      {
        "id": 434,
        "startTime": 975.57,
        "endTime": 977.88,
        "en_text": "- But I don't want to say goodbye.",
        "vi_text": "- Nhưng tôi không muốn nói lời tạm biệt.",
        "ipa": "/ bət aɪ doʊnt wɔnt tɪ seɪ ˌgʊdˈbaɪ./"
      },
      {
        "id": 435,
        "startTime": 977.88,
        "endTime": 980.98,
        "en_text": "- I don't want to say goodbye either.",
        "vi_text": "- Tôi cũng không muốn nói lời tạm biệt.",
        "ipa": "/ aɪ doʊnt wɔnt tɪ seɪ ˌgʊdˈbaɪ ˈiðər./"
      },
      {
        "id": 436,
        "startTime": 980.98,
        "endTime": 984.78,
        "en_text": "(narrator): Peppa and Rohan have become very good friends.",
        "vi_text": "(người kể chuyện): Peppa và Rohan đã trở thành những người bạn rất tốt.",
        "ipa": "/(ˈnɛreɪtər): peppa* ənd roʊən hæv bɪˈkəm ˈvɛri gʊd frɛndz./"
      },
      {
        "id": 437,
        "startTime": 984.78,
        "endTime": 986.69,
        "en_text": "- You can always send each other notes",
        "vi_text": "- Bạn luôn có thể gửi ghi chú cho nhau",
        "ipa": "/ ju kən ˈɔlˌweɪz sɛnd iʧ ˈəðər noʊts/"
      },
      {
        "id": 438,
        "startTime": 986.68,
        "endTime": 988.32,
        "en_text": "and pictures in the post.",
        "vi_text": "và hình ảnh trong bài.",
        "ipa": "/ənd ˈpɪkʧərz ɪn ðə poʊst./"
      },
      {
        "id": 439,
        "startTime": 988.32,
        "endTime": 989.92,
        "en_text": "- Then you won't forget me!",
        "vi_text": "- Thế thì anh sẽ không quên em đâu!",
        "ipa": "/ ðɛn ju woʊnt fərˈgɛt mi!/"
      },
      {
        "id": 440,
        "startTime": 989.92,
        "endTime": 992.76,
        "en_text": "- I won't forget you, Rohan!",
        "vi_text": "- Tôi sẽ không quên anh, Rohan!",
        "ipa": "/ aɪ woʊnt fərˈgɛt ju, roʊən!/"
      },
      {
        "id": 441,
        "startTime": 992.76,
        "endTime": 995.73,
        "en_text": "Do we have to go home, Granny?",
        "vi_text": "Chúng ta có phải về nhà không, bà?",
        "ipa": "/du wi hæv tɪ goʊ hoʊm, ˈgræni?/"
      },
      {
        "id": 442,
        "startTime": 995.73,
        "endTime": 997.0,
        "en_text": "- Oh, Peppa.",
        "vi_text": "- Ôi, Peppa.",
        "ipa": "/ oʊ, peppa*./"
      },
      {
        "id": 443,
        "startTime": 997.0,
        "endTime": 999.23,
        "en_text": "There will be other holidays.",
        "vi_text": "Sẽ có những ngày lễ khác.",
        "ipa": "/ðɛr wɪl bi ˈəðər ˈhɑləˌdeɪz./"
      },
      {
        "id": 444,
        "startTime": 999.23,
        "endTime": 1002.2,
        "en_text": "- Say goodbye to the potato, George.",
        "vi_text": "- Tạm biệt khoai tây đi, George.",
        "ipa": "/ seɪ ˌgʊdˈbaɪ tɪ ðə pəˈteɪˌtoʊ, ʤɔrʤ./"
      },
      {
        "id": 445,
        "startTime": 1002.2,
        "endTime": 1003.3,
        "en_text": "- Oh.",
        "vi_text": "- Ồ.",
        "ipa": "/ oʊ./"
      },
      {
        "id": 446,
        "startTime": 1003.3,
        "endTime": 1004.94,
        "en_text": "- Don't worry, George.",
        "vi_text": "- Đừng lo, George.",
        "ipa": "/ doʊnt ˈwəri, ʤɔrʤ./"
      },
      {
        "id": 447,
        "startTime": 1004.94,
        "endTime": 1007.74,
        "en_text": "There will be other potatoes.",
        "vi_text": "Sẽ có những củ khoai tây khác.",
        "ipa": "/ðɛr wɪl bi ˈəðər pəˈteɪtoʊz./"
      },
      {
        "id": 448,
        "startTime": 1007.74,
        "endTime": 1008.81,
        "en_text": "(boat horn honking)",
        "vi_text": "(tiếng còi thuyền)",
        "ipa": "/(boʊt hɔrn ˈhɔŋkɪŋ)/"
      },
      {
        "id": 449,
        "startTime": 1008.81,
        "endTime": 1009.84,
        "en_text": "(narrator): The cruise ship",
        "vi_text": "(người kể chuyện): Con tàu du lịch",
        "ipa": "/(ˈnɛreɪtər): ðə kruz ʃɪp/"
      },
      {
        "id": 450,
        "startTime": 1009.84,
        "endTime": 1012.61,
        "en_text": "has sailed all the way home.",
        "vi_text": "đã đi thuyền về nhà.",
        "ipa": "/həz seɪld ɔl ðə weɪ hoʊm./"
      },
      {
        "id": 451,
        "startTime": 1012.61,
        "endTime": 1015.58,
        "en_text": "- Thank you for sailing with us. Please come again!",
        "vi_text": "- Cảm ơn bạn đã đi thuyền cùng chúng tôi. Xin hãy đến lần nữa!",
        "ipa": "/ θæŋk ju fər ˈseɪlɪŋ wɪθ ˈjuˈɛs. pliz kəm əˈgɛn!/"
      },
      {
        "id": 452,
        "startTime": 1015.58,
        "endTime": 1020.42,
        "en_text": "- Yes! And next time, Mummy and Daddy can come too!",
        "vi_text": "- Đúng! Và lần sau, Bố và Mẹ cũng có thể đến!",
        "ipa": "/ jɛs! ənd nɛkst taɪm, ˈməmi ənd ˈdædi kən kəm tu!/"
      },
      {
        "id": 453,
        "startTime": 1022.72,
        "endTime": 1025.46,
        "en_text": "(narrator): Mummy Pig, Daddy Pig, and Goldie the Fish",
        "vi_text": "(người kể chuyện): Mẹ Lợn, Lợn Bố và Cá Vàng",
        "ipa": "/(ˈnɛreɪtər): ˈməmi pɪg, ˈdædi pɪg, ənd ˈgoʊldi ðə fɪʃ/"
      },
      {
        "id": 454,
        "startTime": 1025.46,
        "endTime": 1028.03,
        "en_text": "have come to meet Peppa and George.",
        "vi_text": "đã đến gặp Peppa và George.",
        "ipa": "/hæv kəm tɪ mit peppa* ənd ʤɔrʤ./"
      },
      {
        "id": 455,
        "startTime": 1028.03,
        "endTime": 1029.76,
        "en_text": "- Mummy! Daddy!",
        "vi_text": "- Mẹ ơi! Bố!",
        "ipa": "/ ˈməmi! ˈdædi!/"
      },
      {
        "id": 456,
        "startTime": 1029.76,
        "endTime": 1032.56,
        "en_text": "- Hello! - Peppa! George!",
        "vi_text": "- Xin chào! - Peppa! George!",
        "ipa": "/ hɛˈloʊ!  peppa*! ʤɔrʤ!/"
      },
      {
        "id": 457,
        "startTime": 1032.56,
        "endTime": 1034.63,
        "en_text": "(gasps) - Goldie!",
        "vi_text": "(thở hổn hển) - Goldie!",
        "ipa": "/(gæsps)  ˈgoʊldi!/"
      },
      {
        "id": 458,
        "startTime": 1034.63,
        "endTime": 1037.3,
        "en_text": "Do you remember me, Goldie?",
        "vi_text": "Bạn có nhớ tôi không, Goldie?",
        "ipa": "/du ju rɪˈmɛmbər mi, ˈgoʊldi?/"
      },
      {
        "id": 459,
        "startTime": 1037.3,
        "endTime": 1039.54,
        "en_text": "(narrator): Goldie remembers Peppa.",
        "vi_text": "(người kể chuyện): Goldie nhớ tới Peppa.",
        "ipa": "/(ˈnɛreɪtər): ˈgoʊldi rɪˈmɛmbərz peppa*./"
      },
      {
        "id": 460,
        "startTime": 1039.54,
        "endTime": 1041.74,
        "en_text": "- I got you a whale!",
        "vi_text": "- Tôi có cho anh một con cá voi!",
        "ipa": "/ aɪ gɑt ju ə weɪl!/"
      },
      {
        "id": 461,
        "startTime": 1042.78,
        "endTime": 1044.61,
        "en_text": "- Was it a good holiday?",
        "vi_text": "- Kì nghỉ vui vẻ chứ?",
        "ipa": "/ wɑz ɪt ə gʊd ˈhɑlɪˌdeɪ?/"
      },
      {
        "id": 462,
        "startTime": 1044.61,
        "endTime": 1047.78,
        "en_text": "- It was the best holiday ever! (snorts)",
        "vi_text": "- Đó là kỳ nghỉ tuyệt vời nhất từ ​​trước đến nay! (khịt mũi)",
        "ipa": "/ ɪt wɑz ðə bɛst ˈhɑlɪˌdeɪ ˈɛvər! (snɔrts)/"
      },
      {
        "id": 463,
        "startTime": 1047.78,
        "endTime": 1050.62,
        "en_text": "With islands and pirates and mermaids, and...",
        "vi_text": "Với những hòn đảo, cướp biển và nàng tiên cá, và...",
        "ipa": "/wɪθ ˈaɪləndz ənd ˈpaɪrəts ənd ˈmərˌmeɪdz, ənd.../"
      },
      {
        "id": 464,
        "startTime": 1050.62,
        "endTime": 1052.35,
        "en_text": "- Tay-toe! (giggling)",
        "vi_text": "- Tay-toe! (cười khúc khích)",
        "ipa": "/ tay-toe*! (ˈgɪgəlɪŋ)/"
      },
      {
        "id": 465,
        "startTime": 1052.35,
        "endTime": 1055.52,
        "en_text": "- And did Granny and Grandpa Pig have a nice holiday?",
        "vi_text": "- Và bà nội và ông nội có một kỳ nghỉ vui vẻ chứ?",
        "ipa": "/ ənd dɪd ˈgræni ənd ˈgrændˌpɑ pɪg hæv ə nis ˈhɑlɪˌdeɪ?/"
      },
      {
        "id": 466,
        "startTime": 1055.52,
        "endTime": 1057.96,
        "en_text": "- Yes! We had a wonderful time!",
        "vi_text": "- Đúng! Chúng tôi đã có một thời gian tuyệt vời!",
        "ipa": "/ jɛs! wi hæd ə ˈwəndərfəl taɪm!/"
      },
      {
        "id": 467,
        "startTime": 1057.96,
        "endTime": 1060.36,
        "en_text": "- Maybe not very restful.",
        "vi_text": "- Có lẽ không được yên tĩnh lắm.",
        "ipa": "/ ˈmeɪbi nɑt ˈvɛri ˈrɛstfəl./"
      },
      {
        "id": 468,
        "startTime": 1060.36,
        "endTime": 1062.39,
        "en_text": "- You can have a rest at home!",
        "vi_text": "- Cậu có thể nghỉ ngơi ở nhà!",
        "ipa": "/ ju kən hæv ə rɛst æt hoʊm!/"
      },
      {
        "id": 469,
        "startTime": 1062.39,
        "endTime": 1066.53,
        "en_text": "Then we can all go on a cruise ship holiday again!",
        "vi_text": "Sau đó tất cả chúng ta có thể đi nghỉ trên tàu du lịch một lần nữa!",
        "ipa": "/ðɛn wi kən ɔl goʊ ɔn ə kruz ʃɪp ˈhɑlɪˌdeɪ əˈgɛn!/"
      },
      {
        "id": 470,
        "startTime": 1066.53,
        "endTime": 1068.8,
        "en_text": "(laughing) - Yes, that would be nice.",
        "vi_text": "(cười) - Ừ, thế thì tốt quá.",
        "ipa": "/(ˈlæfɪŋ)  jɛs, ðət wʊd bi nis./"
      },
      {
        "id": 471,
        "startTime": 1068.8,
        "endTime": 1070.6,
        "en_text": "- I can't wait!",
        "vi_text": "- Tôi không thể đợi được!",
        "ipa": "/ aɪ kænt weɪt!/"
      },
      {
        "id": 472,
        "startTime": 1070.6,
        "endTime": 1074.51,
        "en_text": "(narrator): Peppa and George loved their cruise ship holiday.",
        "vi_text": "(người kể chuyện): Peppa và George yêu thích kỳ nghỉ trên tàu du lịch của họ.",
        "ipa": "/(ˈnɛreɪtər): peppa* ənd ʤɔrʤ ləvd ðɛr kruz ʃɪp ˈhɑlɪˌdeɪ./"
      },
      {
        "id": 473,
        "startTime": 1074.51,
        "endTime": 1078.14,
        "en_text": "Everyone loves a cruise ship holiday!",
        "vi_text": "Mọi người đều thích một kỳ nghỉ trên tàu du lịch!",
        "ipa": "/ˈɛvriˌwən ləvz ə kruz ʃɪp ˈhɑlɪˌdeɪ!/"
      }
    ]
  },
  {
    "id": "ep_3",
    "title": "Tập 3 (Auto Generated)",
    "youtubeId": "6I3Y1aZsDE0",
    "subtitles": [
      {
        "id": 1,
        "startTime": 3.52,
        "endTime": 8.32,
        "en_text": "i'm peppa pig",
        "vi_text": "tôi là lợn peppa",
        "ipa": "/əm peppa* pɪg/"
      },
      {
        "id": 2,
        "startTime": 5.36,
        "endTime": 10.48,
        "en_text": "this is my little brother george",
        "vi_text": "đây là em trai tôi, George",
        "ipa": "/ðɪs ɪz maɪ ˈlɪtəl ˈbrəðər ʤɔrʤ/"
      },
      {
        "id": 3,
        "startTime": 8.32,
        "endTime": 14.6,
        "en_text": "this is mummy pig",
        "vi_text": "đây là mẹ lợn",
        "ipa": "/ðɪs ɪz ˈməmi pɪg/"
      },
      {
        "id": 4,
        "startTime": 10.48,
        "endTime": 14.6,
        "en_text": "and this is daddy pig",
        "vi_text": "và đây là bố lợn",
        "ipa": "/ənd ðɪs ɪz ˈdædi pɪg/"
      },
      {
        "id": 5,
        "startTime": 18.48,
        "endTime": 23.44,
        "en_text": "pepper and george have come to play at",
        "vi_text": "Pepper và George đã đến chơi",
        "ipa": "/ˈpɛpər ənd ʤɔrʤ hæv kəm tɪ pleɪ æt/"
      },
      {
        "id": 6,
        "startTime": 20.8,
        "endTime": 25.36,
        "en_text": "granny and grandpa pig's house hello",
        "vi_text": "nhà ông nội và lợn xin chào",
        "ipa": "/ˈgræni ənd ˈgrændˌpɑ pɪgz haʊs hɛˈloʊ/"
      },
      {
        "id": 7,
        "startTime": 23.44,
        "endTime": 27.92,
        "en_text": "granny and grandpa",
        "vi_text": "bà và ông",
        "ipa": "/ˈgræni ənd ˈgrændˌpɑ/"
      },
      {
        "id": 8,
        "startTime": 25.36,
        "endTime": 30.72,
        "en_text": "hello my little ones would you like to",
        "vi_text": "xin chào các bạn nhỏ của tôi các bạn có muốn không",
        "ipa": "/hɛˈloʊ maɪ ˈlɪtəl wənz wʊd ju laɪk tɪ/"
      },
      {
        "id": 9,
        "startTime": 27.92,
        "endTime": 34.0,
        "en_text": "see what i've made in the garden yes",
        "vi_text": "xem tôi đã làm gì trong vườn nhé",
        "ipa": "/si wət aɪv meɪd ɪn ðə ˈgɑrdən jɛs/"
      },
      {
        "id": 10,
        "startTime": 30.72,
        "endTime": 36.48,
        "en_text": "please then follow me",
        "vi_text": "làm ơn đi theo tôi",
        "ipa": "/pliz ðɛn ˈfɑloʊ mi/"
      },
      {
        "id": 11,
        "startTime": 34.0,
        "endTime": 40.88,
        "en_text": "i wonder what grandpa's made this time",
        "vi_text": "tôi tự hỏi lần này ông nội làm món gì",
        "ipa": "/aɪ ˈwəndər wət ˈgrænˌpɑz meɪd ðɪs taɪm/"
      },
      {
        "id": 12,
        "startTime": 36.48,
        "endTime": 43.28,
        "en_text": "i've made a poo tail what's the hotel a",
        "vi_text": "tôi đã làm một cái đuôi ị khách sạn là gì vậy",
        "ipa": "/aɪv meɪd ə pu teɪl wəts ðə hoʊˈtɛl ə/"
      },
      {
        "id": 13,
        "startTime": 40.88,
        "endTime": 44.56,
        "en_text": "hotel is a house where you can stay for",
        "vi_text": "khách sạn là một ngôi nhà nơi bạn có thể ở",
        "ipa": "/hoʊˈtɛl ɪz ə haʊs wɛr ju kən steɪ fər/"
      },
      {
        "id": 14,
        "startTime": 43.28,
        "endTime": 47.76,
        "en_text": "a holiday",
        "vi_text": "một kỳ nghỉ",
        "ipa": "/ə ˈhɑlɪˌdeɪ/"
      },
      {
        "id": 15,
        "startTime": 44.56,
        "endTime": 51.52,
        "en_text": "hotels are very fancy like a fairy",
        "vi_text": "khách sạn rất lạ mắt như cổ tích",
        "ipa": "/hoʊˈtɛlz ər ˈvɛri ˈfænsi laɪk ə ˈfɛri/"
      },
      {
        "id": 16,
        "startTime": 47.76,
        "endTime": 54.4,
        "en_text": "castle yes just like a fairy castle when",
        "vi_text": "lâu đài vâng giống như một lâu đài cổ tích khi",
        "ipa": "/ˈkæsəl jɛs ʤɪst laɪk ə ˈfɛri ˈkæsəl wɪn/"
      },
      {
        "id": 17,
        "startTime": 51.52,
        "endTime": 56.56,
        "en_text": "you arrive someone takes your bags and",
        "vi_text": "bạn đến nơi ai đó sẽ lấy túi của bạn và",
        "ipa": "/ju əraɪv ˈsəmˌwən teɪks jʊr bægz ənd/"
      },
      {
        "id": 18,
        "startTime": 54.4,
        "endTime": 59.52,
        "en_text": "you're given a comfy room to stay in",
        "vi_text": "bạn được cấp một căn phòng thoải mái để ở",
        "ipa": "/jʊr ˈgɪvɪn ə ˈkəmfi rum tɪ steɪ ɪn/"
      },
      {
        "id": 19,
        "startTime": 56.56,
        "endTime": 62.08,
        "en_text": "that's what a hotel is um",
        "vi_text": "khách sạn là vậy đó",
        "ipa": "/ðæts wət ə hoʊˈtɛl ɪz əm/"
      },
      {
        "id": 20,
        "startTime": 59.52,
        "endTime": 65.76,
        "en_text": "i like hotels",
        "vi_text": "tôi thích khách sạn",
        "ipa": "/aɪ laɪk hoʊˈtɛlz/"
      },
      {
        "id": 21,
        "startTime": 62.08,
        "endTime": 68.4,
        "en_text": "my hotel isn't exactly like that i'm",
        "vi_text": "khách sạn của tôi không hẳn như vậy, tôi",
        "ipa": "/maɪ hoʊˈtɛl ˈɪzənt ɪgˈzæktli laɪk ðət əm/"
      },
      {
        "id": 22,
        "startTime": 65.76,
        "endTime": 73.04,
        "en_text": "sure it's still very nice",
        "vi_text": "chắc chắn nó vẫn rất đẹp",
        "ipa": "/ʃʊr ɪts stɪl ˈvɛri nis/"
      },
      {
        "id": 23,
        "startTime": 68.4,
        "endTime": 77.12,
        "en_text": "here it is my bug hotel oh",
        "vi_text": "đây là khách sạn lỗi của tôi ồ",
        "ipa": "/hir ɪt ɪz maɪ bəg hoʊˈtɛl oʊ/"
      },
      {
        "id": 24,
        "startTime": 73.04,
        "endTime": 79.76,
        "en_text": "oh my word good isn't it it isn't quite",
        "vi_text": "ồ lời nói của tôi là tốt phải không, nó không khá lắm",
        "ipa": "/oʊ maɪ wərd gʊd ˈɪzənt ɪt ɪt ˈɪzənt kwaɪt/"
      },
      {
        "id": 25,
        "startTime": 77.12,
        "endTime": 83.12,
        "en_text": "what i was expecting when you said hotel",
        "vi_text": "điều tôi đã mong đợi khi bạn nói khách sạn",
        "ipa": "/wət aɪ wɑz ɪkˈspɛktɪŋ wɪn ju sɛd hoʊˈtɛl/"
      },
      {
        "id": 26,
        "startTime": 79.76,
        "endTime": 86.48,
        "en_text": "how can we stay in that it's not for us",
        "vi_text": "làm sao chúng ta có thể ở trong đó vì nó không dành cho chúng ta",
        "ipa": "/haʊ kən wi steɪ ɪn ðət ɪts nɑt fər ˈjuˈɛs/"
      },
      {
        "id": 27,
        "startTime": 83.12,
        "endTime": 89.84,
        "en_text": "this hotel is for little bugs oh",
        "vi_text": "khách sạn này dành cho những con bọ nhỏ ồ",
        "ipa": "/ðɪs hoʊˈtɛl ɪz fər ˈlɪtəl bəgz oʊ/"
      },
      {
        "id": 28,
        "startTime": 86.48,
        "endTime": 94.8,
        "en_text": "it is made out of sticks old logs bricks",
        "vi_text": "nó được làm từ những thanh gạch khúc gỗ cũ",
        "ipa": "/ɪt ɪz meɪd aʊt əv stɪks oʊld lɔgz brɪks/"
      },
      {
        "id": 29,
        "startTime": 89.84,
        "endTime": 97.92,
        "en_text": "and leaves all the things that bugs like",
        "vi_text": "và để lại tất cả những thứ mà bọ thích",
        "ipa": "/ənd livz ɔl ðə θɪŋz ðət bəgz laɪk/"
      },
      {
        "id": 30,
        "startTime": 94.8,
        "endTime": 102.08,
        "en_text": "here comes a little beetle look our",
        "vi_text": "ở đây có một con bọ nhỏ nhìn chúng ta",
        "ipa": "/hir kəmz ə ˈlɪtəl ˈbitəl lʊk ɑr/"
      },
      {
        "id": 31,
        "startTime": 97.92,
        "endTime": 104.8,
        "en_text": "first guest welcome to our hotel um",
        "vi_text": "vị khách đầu tiên chào mừng đến khách sạn của chúng tôi ừm",
        "ipa": "/fərst gɛst ˈwɛlkəm tɪ ɑr hoʊˈtɛl əm/"
      },
      {
        "id": 32,
        "startTime": 102.08,
        "endTime": 108.72,
        "en_text": "which of our rooms do you fancy it's",
        "vi_text": "bạn thích phòng nào trong số các phòng của chúng tôi",
        "ipa": "/wɪʧ əv ɑr rumz du ju ˈfænsi ɪts/"
      },
      {
        "id": 33,
        "startTime": 104.8,
        "endTime": 111.84,
        "en_text": "going into the tube thing yes the peter",
        "vi_text": "đi vào trong ống, vâng, peter",
        "ipa": "/goʊɪŋ ˈɪntu ðə tub θɪŋ jɛs ðə ˈpitər/"
      },
      {
        "id": 34,
        "startTime": 108.72,
        "endTime": 114.32,
        "en_text": "likes this bamboo tube the best it's",
        "vi_text": "thích cái ống tre này nhất đấy",
        "ipa": "/laɪks ðɪs bæmˈbu tub ðə bɛst ɪts/"
      },
      {
        "id": 35,
        "startTime": 111.84,
        "endTime": 116.4,
        "en_text": "just the right size for it it looks",
        "vi_text": "đúng kích cỡ như nó trông",
        "ipa": "/ʤɪst ðə raɪt saɪz fər ɪt ɪt lʊks/"
      },
      {
        "id": 36,
        "startTime": 114.32,
        "endTime": 119.28,
        "en_text": "really cozy",
        "vi_text": "thực sự ấm cúng",
        "ipa": "/ˈrɪli ˈkoʊzi/"
      },
      {
        "id": 37,
        "startTime": 116.4,
        "endTime": 121.84,
        "en_text": "yes and i want lots more bugs to stay at",
        "vi_text": "vâng và tôi muốn có nhiều lỗi hơn nữa",
        "ipa": "/jɛs ənd aɪ wɔnt lɑts mɔr bəgz tɪ steɪ æt/"
      },
      {
        "id": 38,
        "startTime": 119.28,
        "endTime": 123.76,
        "en_text": "the hotel because they are very good for",
        "vi_text": "khách sạn vì họ rất tốt cho",
        "ipa": "/ðə hoʊˈtɛl bɪˈkəz ðeɪ ər ˈvɛri gʊd fər/"
      },
      {
        "id": 39,
        "startTime": 121.84,
        "endTime": 128.64,
        "en_text": "the garden oh",
        "vi_text": "khu vườn ơi",
        "ipa": "/ðə ˈgɑrdən oʊ/"
      },
      {
        "id": 40,
        "startTime": 123.76,
        "endTime": 130.4,
        "en_text": "look a ladybug ah yes here comes our",
        "vi_text": "nhìn con bọ rùa à vâng, chúng ta đến đây rồi",
        "ipa": "/lʊk ə ˈleɪdiˌbəg ɑ jɛs hir kəmz ɑr/"
      },
      {
        "id": 41,
        "startTime": 128.64,
        "endTime": 132.88,
        "en_text": "next guest",
        "vi_text": "vị khách tiếp theo",
        "ipa": "/nɛkst gɛst/"
      },
      {
        "id": 42,
        "startTime": 130.4,
        "endTime": 136.8,
        "en_text": "the whole family have come to stay the",
        "vi_text": "cả gia đình đã đến ở lại",
        "ipa": "/ðə hoʊl ˈfæməli hæv kəm tɪ steɪ ðə/"
      },
      {
        "id": 43,
        "startTime": 132.88,
        "endTime": 139.28,
        "en_text": "baby lady birds are so sweet hello",
        "vi_text": "những chú chim bé nhỏ thật ngọt ngào xin chào",
        "ipa": "/ˈbeɪbi ˈleɪdi bərdz ər soʊ swit hɛˈloʊ/"
      },
      {
        "id": 44,
        "startTime": 136.8,
        "endTime": 142.24,
        "en_text": "everyone for you i'd recommend our",
        "vi_text": "mọi người ủng hộ bạn, tôi muốn giới thiệu chúng tôi",
        "ipa": "/ˈɛvriˌwən fər ju aɪd ˌrɛkəˈmɛnd ɑr/"
      },
      {
        "id": 45,
        "startTime": 139.28,
        "endTime": 144.63,
        "en_text": "family rooms the family rooms are a",
        "vi_text": "phòng gia đình phòng gia đình là một",
        "ipa": "/ˈfæməli rumz ðə ˈfæməli rumz ər ə/"
      },
      {
        "id": 46,
        "startTime": 142.24,
        "endTime": 147.28,
        "en_text": "piece of wood with lots of holes",
        "vi_text": "miếng gỗ có nhiều lỗ",
        "ipa": "/pis əv wʊd wɪθ lɑts əv hoʊlz/"
      },
      {
        "id": 47,
        "startTime": 144.63,
        "endTime": 149.6,
        "en_text": "[Laughter]",
        "vi_text": "[Cười]",
        "ipa": "/[ˈlæftər]/"
      },
      {
        "id": 48,
        "startTime": 147.28,
        "endTime": 151.92,
        "en_text": "look a butterfly",
        "vi_text": "nhìn một con bướm",
        "ipa": "/lʊk ə ˈbətərˌflaɪ/"
      },
      {
        "id": 49,
        "startTime": 149.6,
        "endTime": 156.28,
        "en_text": "welcome miss butterfly",
        "vi_text": "chào mừng cô bướm",
        "ipa": "/ˈwɛlkəm mɪs ˈbətərˌflaɪ/"
      },
      {
        "id": 50,
        "startTime": 151.92,
        "endTime": 158.96,
        "en_text": "i see you've discovered our roof terrace",
        "vi_text": "tôi thấy bạn đã phát hiện ra sân thượng của chúng tôi",
        "ipa": "/aɪ si juv dɪˈskəvərd ɑr rʊf ˈtɛrəs/"
      },
      {
        "id": 51,
        "startTime": 156.28,
        "endTime": 161.44,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 52,
        "startTime": 158.96,
        "endTime": 164.4,
        "en_text": "these are a bit too creepy crawly for me",
        "vi_text": "những điều này hơi quá đáng sợ đối với tôi",
        "ipa": "/ðiz ər ə bɪt tu ˈkripi ˈkrɔli fər mi/"
      },
      {
        "id": 53,
        "startTime": 161.44,
        "endTime": 167.04,
        "en_text": "no granny these are wood lice they do",
        "vi_text": "không bà ơi, đây là chấy gỗ họ làm",
        "ipa": "/noʊ ˈgræni ðiz ər wʊd laɪs ðeɪ du/"
      },
      {
        "id": 54,
        "startTime": 164.4,
        "endTime": 169.92,
        "en_text": "lots of good work they prefer a room",
        "vi_text": "rất nhiều công việc tốt họ thích một căn phòng",
        "ipa": "/lɑts əv gʊd wərk ðeɪ prɪˈfər ə rum/"
      },
      {
        "id": 55,
        "startTime": 167.04,
        "endTime": 171.6,
        "en_text": "that is nice and dark may i recommend",
        "vi_text": "cái đó đẹp và tối tôi có thể giới thiệu không",
        "ipa": "/ðət ɪz nis ənd dɑrk meɪ aɪ ˌrɛkəˈmɛnd/"
      },
      {
        "id": 56,
        "startTime": 169.92,
        "endTime": 175.28,
        "en_text": "this room for you",
        "vi_text": "căn phòng này dành cho bạn",
        "ipa": "/ðɪs rum fər ju/"
      },
      {
        "id": 57,
        "startTime": 171.6,
        "endTime": 175.28,
        "en_text": "night night with nice",
        "vi_text": "đêm đêm thật tuyệt vời",
        "ipa": "/naɪt naɪt wɪθ nis/"
      },
      {
        "id": 58,
        "startTime": 176.24,
        "endTime": 182.08,
        "en_text": "well done grandpa your hotel is almost",
        "vi_text": "làm tốt lắm ông nội, khách sạn của ông sắp xong rồi",
        "ipa": "/wɛl dən ˈgrændˌpɑ jʊr hoʊˈtɛl ɪz ˈɔlˌmoʊst/"
      },
      {
        "id": 59,
        "startTime": 179.36,
        "endTime": 184.88,
        "en_text": "full there's always room for more guests",
        "vi_text": "đầy đủ luôn có chỗ cho nhiều khách hơn",
        "ipa": "/fʊl ðɛrz ˈɔlˌweɪz rum fər mɔr gɛsts/"
      },
      {
        "id": 60,
        "startTime": 182.08,
        "endTime": 186.72,
        "en_text": "the more the merrier",
        "vi_text": "càng nhiều càng vui",
        "ipa": "/ðə mɔr ðə ˈmɛriər/"
      },
      {
        "id": 61,
        "startTime": 184.88,
        "endTime": 189.28,
        "en_text": "look at me",
        "vi_text": "nhìn tôi",
        "ipa": "/lʊk æt mi/"
      },
      {
        "id": 62,
        "startTime": 186.72,
        "endTime": 190.8,
        "en_text": "it's a bumblebee",
        "vi_text": "đó là một con ong nghệ",
        "ipa": "/ɪts ə ˈbəmbəlˌbi/"
      },
      {
        "id": 63,
        "startTime": 189.28,
        "endTime": 192.0,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 64,
        "startTime": 190.8,
        "endTime": 193.84,
        "en_text": "oh no",
        "vi_text": "ồ không",
        "ipa": "/oʊ noʊ/"
      },
      {
        "id": 65,
        "startTime": 192.0,
        "endTime": 196.08,
        "en_text": "it can't fit in",
        "vi_text": "nó không thể vừa với",
        "ipa": "/ɪt kænt fɪt ɪn/"
      },
      {
        "id": 66,
        "startTime": 193.84,
        "endTime": 198.32,
        "en_text": "none of the hotel rooms are big enough",
        "vi_text": "không có phòng khách sạn nào đủ lớn",
        "ipa": "/nən əv ðə hoʊˈtɛl rumz ər bɪg ɪˈnəf/"
      },
      {
        "id": 67,
        "startTime": 196.08,
        "endTime": 201.04,
        "en_text": "for the bumblebee we'll just have to",
        "vi_text": "đối với ong vò vẽ, chúng ta sẽ phải",
        "ipa": "/fər ðə ˈbəmbəlˌbi wɪl ʤɪst hæv tɪ/"
      },
      {
        "id": 68,
        "startTime": 198.32,
        "endTime": 204.32,
        "en_text": "make a new room pepper and george would",
        "vi_text": "làm một căn phòng mới cho Pepper và George",
        "ipa": "/meɪk ə nu rum ˈpɛpər ənd ʤɔrʤ wʊd/"
      },
      {
        "id": 69,
        "startTime": 201.04,
        "endTime": 206.64,
        "en_text": "you like to help yes please",
        "vi_text": "bạn muốn giúp đỡ, vâng, làm ơn",
        "ipa": "/ju laɪk tɪ hɛlp jɛs pliz/"
      },
      {
        "id": 70,
        "startTime": 204.32,
        "endTime": 209.92,
        "en_text": "first we need to find something big",
        "vi_text": "đầu tiên chúng ta cần tìm thứ gì đó lớn lao",
        "ipa": "/fərst wi nid tɪ faɪnd ˈsəmθɪŋ bɪg/"
      },
      {
        "id": 71,
        "startTime": 206.64,
        "endTime": 212.96,
        "en_text": "enough what about this flower pot",
        "vi_text": "đủ rồi còn chậu hoa này thì sao",
        "ipa": "/ɪˈnəf wət əˈbaʊt ðɪs flaʊər pɑt/"
      },
      {
        "id": 72,
        "startTime": 209.92,
        "endTime": 216.8,
        "en_text": "that's perfect we'll just turn it upside",
        "vi_text": "thật hoàn hảo, chúng ta sẽ đảo ngược nó",
        "ipa": "/ðæts ˈpərˌfɪkt wɪl ʤɪst tərn ɪt ˈəpˈsaɪd/"
      },
      {
        "id": 73,
        "startTime": 212.96,
        "endTime": 220.56,
        "en_text": "down would it be like a comfy bed inside",
        "vi_text": "xuống nó sẽ giống như một chiếc giường thoải mái bên trong",
        "ipa": "/daʊn wʊd ɪt bi laɪk ə ˈkəmfi bɛd ˌɪnˈsaɪd/"
      },
      {
        "id": 74,
        "startTime": 216.8,
        "endTime": 223.84,
        "en_text": "yes i'm sure the bee would like that",
        "vi_text": "vâng tôi chắc chắn con ong sẽ thích điều đó",
        "ipa": "/jɛs əm ʃʊr ðə bi wʊd laɪk ðət/"
      },
      {
        "id": 75,
        "startTime": 220.56,
        "endTime": 226.8,
        "en_text": "george has found some dry grass perfect",
        "vi_text": "George đã tìm được một ít cỏ khô hoàn hảo",
        "ipa": "/ʤɔrʤ həz faʊnd səm draɪ græs ˈpərˌfɪkt/"
      },
      {
        "id": 76,
        "startTime": 223.84,
        "endTime": 229.68,
        "en_text": "that will make a very comfy bed",
        "vi_text": "nó sẽ làm một chiếc giường rất thoải mái",
        "ipa": "/ðət wɪl meɪk ə ˈvɛri ˈkəmfi bɛd/"
      },
      {
        "id": 77,
        "startTime": 226.8,
        "endTime": 230.54,
        "en_text": "the flower pot room is just right for",
        "vi_text": "căn phòng có chậu hoa rất phù hợp cho",
        "ipa": "/ðə flaʊər pɑt rum ɪz ʤɪst raɪt fər/"
      },
      {
        "id": 78,
        "startTime": 229.68,
        "endTime": 232.88,
        "en_text": "the bumble bee",
        "vi_text": "con ong nghệ",
        "ipa": "/ðə ˈbəmbəl bi/"
      },
      {
        "id": 79,
        "startTime": 230.54,
        "endTime": 237.12,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 80,
        "startTime": 232.88,
        "endTime": 240.32,
        "en_text": "she's going buzz buzz i'm a bumblebee i",
        "vi_text": "cô ấy sẽ buzz buzz tôi là một con ong nghệ tôi",
        "ipa": "/ʃiz goʊɪŋ bəz bəz əm ə ˈbəmbəlˌbi aɪ/"
      },
      {
        "id": 81,
        "startTime": 237.12,
        "endTime": 243.52,
        "en_text": "like to buzz around buzz george is the",
        "vi_text": "thích ồn ào xung quanh buzz george là",
        "ipa": "/laɪk tɪ bəz əraʊnd bəz ʤɔrʤ ɪz ðə/"
      },
      {
        "id": 82,
        "startTime": 240.32,
        "endTime": 247.36,
        "en_text": "beetle crawling on the ground we are",
        "vi_text": "bọ cánh cứng đang bò trên mặt đất chúng ta",
        "ipa": "/ˈbitəl ˈkrɔlɪŋ ɔn ðə graʊnd wi ər/"
      },
      {
        "id": 83,
        "startTime": 243.52,
        "endTime": 251.52,
        "en_text": "little bugs we play all day we like the",
        "vi_text": "những lỗi nhỏ chúng tôi chơi cả ngày chúng tôi thích",
        "ipa": "/ˈlɪtəl bəgz wi pleɪ ɔl deɪ wi laɪk ðə/"
      },
      {
        "id": 84,
        "startTime": 247.36,
        "endTime": 254.32,
        "en_text": "bug hotel and we want to stay hmm you're",
        "vi_text": "khách sạn lỗi và chúng tôi muốn ở lại hmm bạn là",
        "ipa": "/bəg hoʊˈtɛl ənd wi wɔnt tɪ steɪ həm jʊr/"
      },
      {
        "id": 85,
        "startTime": 251.52,
        "endTime": 257.44,
        "en_text": "very large bugs aren't you i don't think",
        "vi_text": "lỗi rất lớn phải không bạn, tôi không nghĩ vậy",
        "ipa": "/ˈvɛri lɑrʤ bəgz ˈɑrənt ju aɪ doʊnt θɪŋk/"
      },
      {
        "id": 86,
        "startTime": 254.32,
        "endTime": 259.84,
        "en_text": "we have any rooms big enough oh",
        "vi_text": "chúng tôi có phòng nào đủ lớn không",
        "ipa": "/wi hæv ˈɛni rumz bɪg ɪˈnəf oʊ/"
      },
      {
        "id": 87,
        "startTime": 257.44,
        "endTime": 263.12,
        "en_text": "but the bug hotel never turns guests",
        "vi_text": "nhưng khách sạn lỗi không bao giờ quay lại với khách",
        "ipa": "/bət ðə bəg hoʊˈtɛl ˈnɛvər tərnz gɛsts/"
      },
      {
        "id": 88,
        "startTime": 259.84,
        "endTime": 266.24,
        "en_text": "away we just make more rooms here you",
        "vi_text": "chúng tôi sẽ tạo thêm phòng ở đây cho bạn",
        "ipa": "/əˈweɪ wi ʤɪst meɪk mɔr rumz hir ju/"
      },
      {
        "id": 89,
        "startTime": 263.12,
        "endTime": 268.48,
        "en_text": "are the grandest room of all for our",
        "vi_text": "là căn phòng lớn nhất dành cho chúng ta",
        "ipa": "/ər ðə ˈgrændəst rum əv ɔl fər ɑr/"
      },
      {
        "id": 90,
        "startTime": 266.24,
        "endTime": 272.08,
        "en_text": "most important guests",
        "vi_text": "những vị khách quan trọng nhất",
        "ipa": "/moʊst ˌɪmˈpɔrtənt gɛsts/"
      },
      {
        "id": 91,
        "startTime": 268.48,
        "endTime": 275.36,
        "en_text": "i'm all lovely and snug",
        "vi_text": "tôi rất đáng yêu và thoải mái",
        "ipa": "/əm ɔl ˈləvli ənd snəg/"
      },
      {
        "id": 92,
        "startTime": 272.08,
        "endTime": 278.96,
        "en_text": "i think it's the best fancy hotel in all",
        "vi_text": "tôi nghĩ đó là khách sạn sang trọng nhất",
        "ipa": "/aɪ θɪŋk ɪts ðə bɛst ˈfænsi hoʊˈtɛl ɪn ɔl/"
      },
      {
        "id": 93,
        "startTime": 275.36,
        "endTime": 282.56,
        "en_text": "the world yes it is rather good",
        "vi_text": "thế giới vâng, nó khá tốt",
        "ipa": "/ðə wərld jɛs ɪt ɪz ˈrəðər gʊd/"
      },
      {
        "id": 94,
        "startTime": 278.96,
        "endTime": 285.92,
        "en_text": "peppa and george love the bug hotel all",
        "vi_text": "peppa và george đều thích khách sạn bọ",
        "ipa": "/peppa* ənd ʤɔrʤ ləv ðə bəg hoʊˈtɛl ɔl/"
      },
      {
        "id": 95,
        "startTime": 282.56,
        "endTime": 287.76,
        "en_text": "the little bugs love the bug hotel",
        "vi_text": "những con bọ nhỏ yêu thích khách sạn bọ",
        "ipa": "/ðə ˈlɪtəl bəgz ləv ðə bəg hoʊˈtɛl/"
      },
      {
        "id": 96,
        "startTime": 285.92,
        "endTime": 290.72,
        "en_text": "i'm a bumblebee",
        "vi_text": "tôi là một con ong nghệ",
        "ipa": "/əm ə ˈbəmbəlˌbi/"
      },
      {
        "id": 97,
        "startTime": 287.76,
        "endTime": 294.08,
        "en_text": "i like to buzz around george is the",
        "vi_text": "tôi thích bàn luận xung quanh George là",
        "ipa": "/aɪ laɪk tɪ bəz əraʊnd ʤɔrʤ ɪz ðə/"
      },
      {
        "id": 98,
        "startTime": 290.72,
        "endTime": 297.84,
        "en_text": "beetle crawling on the ground we are",
        "vi_text": "bọ cánh cứng đang bò trên mặt đất chúng ta",
        "ipa": "/ˈbitəl ˈkrɔlɪŋ ɔn ðə graʊnd wi ər/"
      },
      {
        "id": 99,
        "startTime": 294.08,
        "endTime": 303.08,
        "en_text": "little bugs we play all day we like the",
        "vi_text": "những lỗi nhỏ chúng tôi chơi cả ngày chúng tôi thích",
        "ipa": "/ˈlɪtəl bəgz wi pleɪ ɔl deɪ wi laɪk ðə/"
      },
      {
        "id": 100,
        "startTime": 297.84,
        "endTime": 303.08,
        "en_text": "bug hotel and we want to stay",
        "vi_text": "khách sạn lỗi và chúng tôi muốn ở lại",
        "ipa": "/bəg hoʊˈtɛl ənd wi wɔnt tɪ steɪ/"
      },
      {
        "id": 101,
        "startTime": 311.76,
        "endTime": 313.84,
        "en_text": "you",
        "vi_text": "Bạn",
        "ipa": "/ju/"
      }
    ]
  },
  {
    "id": "ep_4",
    "title": "Tập 4 (Auto Generated)",
    "youtubeId": "H2zZG6kzddU",
    "subtitles": [
      {
        "id": 1,
        "startTime": 2.64,
        "endTime": 6.96,
        "en_text": "Baby",
        "vi_text": "Đứa bé",
        "ipa": "/ˈbeɪbi/"
      },
      {
        "id": 2,
        "startTime": 3.96,
        "endTime": 10.72,
        "en_text": "Alexander Peppa and George's cousins are",
        "vi_text": "Anh em họ của Alexander Peppa và George là",
        "ipa": "/ˌælɪgˈzændər peppa* ənd ˈʤɔrʤɪz ˈkəzənz ər/"
      },
      {
        "id": 3,
        "startTime": 6.96,
        "endTime": 13.52,
        "en_text": "coming to visit today mommy how long",
        "vi_text": "hôm nay về thăm mẹ mất bao lâu",
        "ipa": "/ˈkəmɪŋ tɪ ˈvɪzɪt təˈdeɪ ˈmɑmi haʊ lɔŋ/"
      },
      {
        "id": 4,
        "startTime": 10.72,
        "endTime": 15.68,
        "en_text": "before Cousin Chloe is here not long Now",
        "vi_text": "trước khi chị họ Chloe ở đây không lâu. Bây giờ",
        "ipa": "/ˌbiˈfɔr ˈkəzən kloʊi ɪz hir nɑt lɔŋ naʊ/"
      },
      {
        "id": 5,
        "startTime": 13.52,
        "endTime": 19.4,
        "en_text": "Peppa Baby Alexander is coming too",
        "vi_text": "Peppa Baby Alexander cũng tới",
        "ipa": "/peppa* ˈbeɪbi ˌælɪgˈzændər ɪz ˈkəmɪŋ tu/"
      },
      {
        "id": 6,
        "startTime": 15.68,
        "endTime": 23.32,
        "en_text": "remember oh babies cry all the time",
        "vi_text": "hãy nhớ ôi em bé lúc nào cũng khóc",
        "ipa": "/rɪˈmɛmbər oʊ ˈbeɪbiz kraɪ ɔl ðə taɪm/"
      },
      {
        "id": 7,
        "startTime": 19.4,
        "endTime": 26.16,
        "en_text": "they're so noisy I'm sure Baby Alexander",
        "vi_text": "họ ồn ào quá, tôi chắc chắn đấy Baby Alexander",
        "ipa": "/ðɛr soʊ ˈnɔɪzi əm ʃʊr ˈbeɪbi ˌælɪgˈzændər/"
      },
      {
        "id": 8,
        "startTime": 23.32,
        "endTime": 26.16,
        "en_text": "won't be that",
        "vi_text": "sẽ không như vậy",
        "ipa": "/woʊnt bi ðət/"
      },
      {
        "id": 9,
        "startTime": 26.52,
        "endTime": 36.6,
        "en_text": "noisy what's that sound is it a car",
        "vi_text": "ồn ào, âm thanh đó là gì vậy, đó là một chiếc ô tô",
        "ipa": "/ˈnɔɪzi wəts ðət saʊnd ɪz ɪt ə kɑr/"
      },
      {
        "id": 10,
        "startTime": 30.08,
        "endTime": 36.6,
        "en_text": "alarm is it a fire engine no it's Baby",
        "vi_text": "báo động có phải xe cứu hỏa không, em yêu",
        "ipa": "/əˈlɑrm ɪz ɪt ə faɪər ˈɪnʤən noʊ ɪts ˈbeɪbi/"
      },
      {
        "id": 11,
        "startTime": 36.64,
        "endTime": 45.0,
        "en_text": "Alexander hello Peppa hello George hello",
        "vi_text": "Alexander xin chào Peppa xin chào George xin chào",
        "ipa": "/ˌælɪgˈzændər hɛˈloʊ peppa* hɛˈloʊ ʤɔrʤ hɛˈloʊ/"
      },
      {
        "id": 12,
        "startTime": 41.04,
        "endTime": 48.92,
        "en_text": "Cousin Chloe hello everyone hello Uncle",
        "vi_text": "Chị họ Chloe xin chào mọi người chào chú",
        "ipa": "/ˈkəzən kloʊi hɛˈloʊ ˈɛvriˌwən hɛˈloʊ ˈəŋkəl/"
      },
      {
        "id": 13,
        "startTime": 45.0,
        "endTime": 52.05,
        "en_text": "Pig hello hello Auntie Pig you remember",
        "vi_text": "Heo chào dì Heo cô nhớ chưa",
        "ipa": "/pɪg hɛˈloʊ hɛˈloʊ ˈɔnti pɪg ju rɪˈmɛmbər/"
      },
      {
        "id": 14,
        "startTime": 48.92,
        "endTime": 55.23,
        "en_text": "Baby Alexander don't you",
        "vi_text": "Bé Alexander phải không?",
        "ipa": "/ˈbeɪbi ˌælɪgˈzændər doʊnt ju/"
      },
      {
        "id": 15,
        "startTime": 52.05,
        "endTime": 55.23,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 16,
        "startTime": 56.12,
        "endTime": 62.52,
        "en_text": "Peppa are you staying for a few days no",
        "vi_text": "Peppa bạn sẽ ở lại vài ngày phải không",
        "ipa": "/peppa* ər ju steɪɪŋ fər ə fju deɪz noʊ/"
      },
      {
        "id": 17,
        "startTime": 60.08,
        "endTime": 65.56,
        "en_text": "this is what Alexander needs for just",
        "vi_text": "đây chính là điều Alexander cần",
        "ipa": "/ðɪs ɪz wət ˌælɪgˈzændər nidz fər ʤɪst/"
      },
      {
        "id": 18,
        "startTime": 62.52,
        "endTime": 69.08,
        "en_text": "one day can't go anywhere without all",
        "vi_text": "một ngày không thể đi đâu mà không có tất cả",
        "ipa": "/wən deɪ kænt goʊ ˈɛniˌwɛr wɪˈθaʊt ɔl/"
      },
      {
        "id": 19,
        "startTime": 65.56,
        "endTime": 72.56,
        "en_text": "these baby things oh hello Baby",
        "vi_text": "những thứ trẻ con này ôi xin chào em yêu",
        "ipa": "/ðiz ˈbeɪbi θɪŋz oʊ hɛˈloʊ ˈbeɪbi/"
      },
      {
        "id": 20,
        "startTime": 69.08,
        "endTime": 75.36,
        "en_text": "Alexander he can't talk Peppa if he",
        "vi_text": "Alexander anh ấy không thể nói chuyện với Peppa nếu anh ấy",
        "ipa": "/ˌælɪgˈzændər hi kænt tɔk peppa* ɪf hi/"
      },
      {
        "id": 21,
        "startTime": 72.56,
        "endTime": 78.12,
        "en_text": "can't talk then how do you know what he",
        "vi_text": "không thể nói chuyện thì làm sao bạn biết anh ấy là gì",
        "ipa": "/kænt tɔk ðɛn haʊ du ju noʊ wət hi/"
      },
      {
        "id": 22,
        "startTime": 75.36,
        "endTime": 82.28,
        "en_text": "wants we",
        "vi_text": "muốn chúng tôi",
        "ipa": "/wɔnts wi/"
      },
      {
        "id": 23,
        "startTime": 78.12,
        "endTime": 85.2,
        "en_text": "guess I'm guessing he's hungry Peppa",
        "vi_text": "tôi đoán là anh ấy đang đói Peppa",
        "ipa": "/gɛs əm ˈgɛsɪŋ hiz ˈhəŋgri peppa*/"
      },
      {
        "id": 24,
        "startTime": 82.28,
        "endTime": 87.2,
        "en_text": "would you like to help feed Alexander",
        "vi_text": "bạn có muốn giúp cho Alexander ăn không",
        "ipa": "/wʊd ju laɪk tɪ hɛlp fid ˌælɪgˈzændər/"
      },
      {
        "id": 25,
        "startTime": 85.2,
        "endTime": 89.92,
        "en_text": "yes",
        "vi_text": "Đúng",
        "ipa": "/jɛs/"
      },
      {
        "id": 26,
        "startTime": 87.2,
        "endTime": 92.84,
        "en_text": "please it is lunchtime for baby Alex",
        "vi_text": "xin vui lòng đây là giờ ăn trưa của bé Alex",
        "ipa": "/pliz ɪt ɪz ˈlənʧˌtaɪm fər ˈbeɪbi ˈæləks/"
      },
      {
        "id": 27,
        "startTime": 89.92,
        "endTime": 96.88,
        "en_text": "alander cousin Peppa is going to feed",
        "vi_text": "anh họ của alander Peppa sẽ đi ăn",
        "ipa": "/alander* ˈkəzən peppa* ɪz goʊɪŋ tɪ fid/"
      },
      {
        "id": 28,
        "startTime": 92.84,
        "endTime": 100.76,
        "en_text": "you today Alexander here you are",
        "vi_text": "hôm nay bạn Alexander bạn đây",
        "ipa": "/ju təˈdeɪ ˌælɪgˈzændər hir ju ər/"
      },
      {
        "id": 29,
        "startTime": 96.88,
        "endTime": 104.8,
        "en_text": "baby oh here it",
        "vi_text": "em yêu ơi nó đây",
        "ipa": "/ˈbeɪbi oʊ hir ɪt/"
      },
      {
        "id": 30,
        "startTime": 100.76,
        "endTime": 108.92,
        "en_text": "is he keeps turning his head feeding",
        "vi_text": "anh ấy cứ quay đầu ăn à",
        "ipa": "/ɪz hi kips ˈtərnɪŋ hɪz hɛd ˈfidɪŋ/"
      },
      {
        "id": 31,
        "startTime": 104.8,
        "endTime": 110.56,
        "en_text": "baby Alexander is quite hard watch this",
        "vi_text": "bé Alexander khá chăm chỉ xem cái này",
        "ipa": "/ˈbeɪbi ˌælɪgˈzændər ɪz kwaɪt hɑrd wɔʧ ðɪs/"
      },
      {
        "id": 32,
        "startTime": 108.92,
        "endTime": 113.56,
        "en_text": "here comes the",
        "vi_text": "đây là",
        "ipa": "/hir kəmz ðə/"
      },
      {
        "id": 33,
        "startTime": 110.56,
        "endTime": 117.04,
        "en_text": "airplane",
        "vi_text": "máy bay",
        "ipa": "/ˈɛrˌpleɪn/"
      },
      {
        "id": 34,
        "startTime": 113.56,
        "endTime": 119.96,
        "en_text": "woo Alexander likes it if you pretend",
        "vi_text": "woo Alexander thích nếu bạn giả vờ",
        "ipa": "/wu ˌælɪgˈzændər laɪks ɪt ɪf ju priˈtɛnd/"
      },
      {
        "id": 35,
        "startTime": 117.04,
        "endTime": 123.56,
        "en_text": "the spoon is an airplane you have a go",
        "vi_text": "chiếc thìa là một chiếc máy bay bạn có thể đi",
        "ipa": "/ðə spun ɪz ən ˈɛrˌpleɪn ju hæv ə goʊ/"
      },
      {
        "id": 36,
        "startTime": 119.96,
        "endTime": 126.64,
        "en_text": "pepper here comes the",
        "vi_text": "hạt tiêu đến đây",
        "ipa": "/ˈpɛpər hir kəmz ðə/"
      },
      {
        "id": 37,
        "startTime": 123.56,
        "endTime": 128.16,
        "en_text": "airplane open your mouth and in through",
        "vi_text": "máy bay mở miệng và đi qua",
        "ipa": "/ˈɛrˌpleɪn ˈoʊpən jʊr maʊθ ənd ɪn θru/"
      },
      {
        "id": 38,
        "startTime": 126.64,
        "endTime": 130.24,
        "en_text": "the",
        "vi_text": "cái",
        "ipa": "/ðə/"
      },
      {
        "id": 39,
        "startTime": 128.16,
        "endTime": 135.4,
        "en_text": "doors",
        "vi_text": "cửa ra vào",
        "ipa": "/dɔrz/"
      },
      {
        "id": 40,
        "startTime": 130.24,
        "endTime": 139.4,
        "en_text": "hooray that was an airplane can you say",
        "vi_text": "Hoan hô đó là một chiếc máy bay bạn có thể nói không",
        "ipa": "/hʊˈreɪ ðət wɑz ən ˈɛrˌpleɪn kən ju seɪ/"
      },
      {
        "id": 41,
        "startTime": 135.4,
        "endTime": 142.44,
        "en_text": "Aeroplane I told you he can't talk he",
        "vi_text": "Máy bay, tôi đã nói với bạn rằng anh ấy không thể nói chuyện",
        "ipa": "/aeroplane* aɪ toʊld ju hi kænt tɔk hi/"
      },
      {
        "id": 42,
        "startTime": 139.4,
        "endTime": 144.88,
        "en_text": "hasn't even said his first word yet",
        "vi_text": "thậm chí còn chưa nói lời đầu tiên",
        "ipa": "/ˈhæzənt ˈivɪn sɛd hɪz fərst wərd jɛt/"
      },
      {
        "id": 43,
        "startTime": 142.44,
        "endTime": 148.16,
        "en_text": "Peppa do you remember what your first",
        "vi_text": "Peppa bạn có nhớ lần đầu tiên của bạn là gì không?",
        "ipa": "/peppa* du ju rɪˈmɛmbər wət jʊr fərst/"
      },
      {
        "id": 44,
        "startTime": 144.88,
        "endTime": 151.24,
        "en_text": "word was no it was",
        "vi_text": "từ đó là không, nó là vậy",
        "ipa": "/wərd wɑz noʊ ɪt wɑz/"
      },
      {
        "id": 45,
        "startTime": 148.16,
        "endTime": 156.0,
        "en_text": "Mommy I thought pepp first word was",
        "vi_text": "Mẹ ơi, con nghĩ lời đầu tiên của pepp là",
        "ipa": "/ˈmɑmi aɪ θɔt pepp* fərst wərd wɑz/"
      },
      {
        "id": 46,
        "startTime": 151.24,
        "endTime": 160.88,
        "en_text": "Daddy no mommy what was George's first",
        "vi_text": "Bố ơi không mẹ đâu là lần đầu tiên của George",
        "ipa": "/ˈdædi noʊ ˈmɑmi wət wɑz ˈʤɔrʤɪz fərst/"
      },
      {
        "id": 47,
        "startTime": 156.0,
        "endTime": 163.6,
        "en_text": "word I saw George's first word was",
        "vi_text": "từ tôi thấy từ đầu tiên của George là",
        "ipa": "/wərd aɪ sɔ ˈʤɔrʤɪz fərst wərd wɑz/"
      },
      {
        "id": 48,
        "startTime": 160.88,
        "endTime": 167.36,
        "en_text": "dinosaur somebody looks like they had a",
        "vi_text": "khủng long ai đó trông giống như họ đã có một",
        "ipa": "/ˈdaɪnəˌsɔr ˈsəmˌbɑdi lʊks laɪk ðeɪ hæd ə/"
      },
      {
        "id": 49,
        "startTime": 163.6,
        "endTime": 172.12,
        "en_text": "good lunch yes bath time I",
        "vi_text": "bữa trưa ngon rồi vâng, đến lúc tắm rồi, tôi",
        "ipa": "/gʊd lənʧ jɛs bæθ taɪm aɪ/"
      },
      {
        "id": 50,
        "startTime": 167.36,
        "endTime": 177.0,
        "en_text": "think Baby Alexander is having a",
        "vi_text": "nghĩ rằng Bé Alexander đang có một",
        "ipa": "/θɪŋk ˈbeɪbi ˌælɪgˈzændər ɪz ˈhævɪŋ ə/"
      },
      {
        "id": 51,
        "startTime": 172.12,
        "endTime": 178.52,
        "en_text": "bath this is Mr Dinosaur can you say",
        "vi_text": "tắm đây là Mr Dinosaur bạn nói được không",
        "ipa": "/bæθ ðɪs ɪz ˈmɪstər ˈdaɪnəˌsɔr kən ju seɪ/"
      },
      {
        "id": 52,
        "startTime": 177.0,
        "endTime": 183.56,
        "en_text": "dinosaur",
        "vi_text": "khủng long",
        "ipa": "/ˈdaɪnəˌsɔr/"
      },
      {
        "id": 53,
        "startTime": 178.52,
        "endTime": 187.44,
        "en_text": "go he can't talk Peppa but he will talk",
        "vi_text": "đi anh ấy không thể nói chuyện Peppa nhưng anh ấy sẽ nói chuyện",
        "ipa": "/goʊ hi kænt tɔk peppa* bət hi wɪl tɔk/"
      },
      {
        "id": 54,
        "startTime": 183.56,
        "endTime": 191.44,
        "en_text": "one day then you'll know what he wants",
        "vi_text": "một ngày nào đó bạn sẽ biết anh ấy muốn gì",
        "ipa": "/wən deɪ ðɛn jul noʊ wət hi wɔnts/"
      },
      {
        "id": 55,
        "startTime": 187.44,
        "endTime": 195.64,
        "en_text": "what do you want to do now Alexander go",
        "vi_text": "bây giờ bạn muốn làm gì Alexander đi đi",
        "ipa": "/wət du ju wɔnt tɪ du naʊ ˌælɪgˈzændər goʊ/"
      },
      {
        "id": 56,
        "startTime": 191.44,
        "endTime": 199.28,
        "en_text": "go I think he wants to go for a walk he",
        "vi_text": "đi đi tôi nghĩ anh ấy muốn đi dạo",
        "ipa": "/goʊ aɪ θɪŋk hi wɔnts tɪ goʊ fər ə wɔk hi/"
      },
      {
        "id": 57,
        "startTime": 195.64,
        "endTime": 201.8,
        "en_text": "can't walk yet but he can go out in his",
        "vi_text": "chưa thể đi được nhưng anh ấy có thể đi ra ngoài",
        "ipa": "/kænt wɔk jɛt bət hi kən goʊ aʊt ɪn hɪz/"
      },
      {
        "id": 58,
        "startTime": 199.28,
        "endTime": 205.64,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 59,
        "startTime": 201.8,
        "endTime": 208.36,
        "en_text": "buggy that's a clever little buggy yes",
        "vi_text": "lỗi đó là một lỗi nhỏ thông minh vâng",
        "ipa": "/ˈbəgi ðæts ə ˈklɛvər ˈlɪtəl ˈbəgi jɛs/"
      },
      {
        "id": 60,
        "startTime": 205.64,
        "endTime": 211.8,
        "en_text": "five gears mud guards and abs as",
        "vi_text": "năm bánh răng chắn bùn và abs như",
        "ipa": "/faɪv gɪrz məd gɑrdz ənd ˈeɪˈbiˈɛs ɛz/"
      },
      {
        "id": 61,
        "startTime": 208.36,
        "endTime": 212.96,
        "en_text": "standard BL BL blah blah that's how",
        "vi_text": "BL tiêu chuẩn BL blah blah đó là cách",
        "ipa": "/ˈstændərd bl* bl* blɑ blɑ ðæts haʊ/"
      },
      {
        "id": 62,
        "startTime": 211.8,
        "endTime": 215.96,
        "en_text": "Daddy's",
        "vi_text": "của bố",
        "ipa": "/ˈdædiz/"
      },
      {
        "id": 63,
        "startTime": 212.96,
        "endTime": 220.84,
        "en_text": "talk Alexander likes it when you talk",
        "vi_text": "nói chuyện Alexander thích khi bạn nói chuyện",
        "ipa": "/tɔk ˌælɪgˈzændər laɪks ɪt wɪn ju tɔk/"
      },
      {
        "id": 64,
        "startTime": 215.96,
        "endTime": 220.84,
        "en_text": "Peppa that's because I am very",
        "vi_text": "Peppa đó là vì tôi rất",
        "ipa": "/peppa* ðæts bɪˈkəz aɪ æm ˈvɛri/"
      },
      {
        "id": 65,
        "startTime": 220.88,
        "endTime": 230.36,
        "en_text": "interesting this is the sky can you say",
        "vi_text": "thú vị đây là bầu trời bạn có thể nói không",
        "ipa": "/ˈɪntəˌrɛstɪŋ ðɪs ɪz ðə skaɪ kən ju seɪ/"
      },
      {
        "id": 66,
        "startTime": 224.88,
        "endTime": 232.2,
        "en_text": "Sky Go the sky is where rain comes from",
        "vi_text": "Sky Go bầu trời là nơi mưa đến",
        "ipa": "/skaɪ goʊ ðə skaɪ ɪz wɛr reɪn kəmz frəm/"
      },
      {
        "id": 67,
        "startTime": 230.36,
        "endTime": 236.36,
        "en_text": "can you say",
        "vi_text": "bạn có thể nói",
        "ipa": "/kən ju seɪ/"
      },
      {
        "id": 68,
        "startTime": 232.2,
        "endTime": 240.2,
        "en_text": "rain rain is good for ducks and plants",
        "vi_text": "mưa mưa tốt cho vịt và cây cối",
        "ipa": "/reɪn reɪn ɪz gʊd fər dəks ənd plænts/"
      },
      {
        "id": 69,
        "startTime": 236.36,
        "endTime": 243.88,
        "en_text": "and making muddy puzzles",
        "vi_text": "và tạo ra những câu đố lầy lội",
        "ipa": "/ənd ˈmeɪkɪŋ ˈmədi ˈpəzəlz/"
      },
      {
        "id": 70,
        "startTime": 240.2,
        "endTime": 249.2,
        "en_text": "Peppa has found a big muddy puddle look",
        "vi_text": "Peppa đã tìm thấy một vũng bùn lớn",
        "ipa": "/peppa* həz faʊnd ə bɪg ˈmədi ˈpədəl lʊk/"
      },
      {
        "id": 71,
        "startTime": 243.88,
        "endTime": 249.2,
        "en_text": "Alexander I'm jumping up and down in a",
        "vi_text": "Alexander Tôi đang nhảy lên nhảy xuống",
        "ipa": "/ˌælɪgˈzændər əm ˈʤəmpɪŋ əp ənd daʊn ɪn ə/"
      },
      {
        "id": 72,
        "startTime": 249.48,
        "endTime": 257.2,
        "en_text": "puddle I love jumping up and down in",
        "vi_text": "vũng nước Tôi thích nhảy lên nhảy xuống",
        "ipa": "/ˈpədəl aɪ ləv ˈʤəmpɪŋ əp ənd daʊn ɪn/"
      },
      {
        "id": 73,
        "startTime": 252.72,
        "endTime": 260.2,
        "en_text": "puddles huddles ooh Alexander has said",
        "vi_text": "vũng nước tụ tập ooh Alexander đã nói",
        "ipa": "/ˈpədəlz ˈhədəlz u ˌælɪgˈzændər həz sɛd/"
      },
      {
        "id": 74,
        "startTime": 257.2,
        "endTime": 264.68,
        "en_text": "his first word",
        "vi_text": "lời đầu tiên của anh ấy",
        "ipa": "/hɪz fərst wərd/"
      },
      {
        "id": 75,
        "startTime": 260.2,
        "endTime": 268.64,
        "en_text": "puddles puddles and I taught him to say",
        "vi_text": "vũng nước vũng nước và tôi đã dạy anh ấy nói",
        "ipa": "/ˈpədəlz ˈpədəlz ənd aɪ tɔt ɪm tɪ seɪ/"
      },
      {
        "id": 76,
        "startTime": 264.68,
        "endTime": 268.64,
        "en_text": "it puddles",
        "vi_text": "nó vũng nước",
        "ipa": "/ɪt ˈpədəlz/"
      },
      {
        "id": 77,
        "startTime": 272.14,
        "endTime": 276.91,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 78,
        "startTime": 275.32,
        "endTime": 281.93,
        "en_text": "hide and",
        "vi_text": "ẩn và",
        "ipa": "/haɪd ənd/"
      },
      {
        "id": 79,
        "startTime": 276.91,
        "endTime": 281.93,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 80,
        "startTime": 282.84,
        "endTime": 289.28,
        "en_text": "seek Peppa and George are playing hide",
        "vi_text": "tìm Peppa và George đang chơi trốn",
        "ipa": "/sik peppa* ənd ʤɔrʤ ər pleɪɪŋ haɪd/"
      },
      {
        "id": 81,
        "startTime": 285.4,
        "endTime": 291.0,
        "en_text": "and seek it is George's turn to hide he",
        "vi_text": "và tìm kiếm đến lượt George phải giấu anh ấy",
        "ipa": "/ənd sik ɪt ɪz ˈʤɔrʤɪz tərn tɪ haɪd hi/"
      },
      {
        "id": 82,
        "startTime": 289.28,
        "endTime": 294.96,
        "en_text": "must quickly find somewhere to hide",
        "vi_text": "phải nhanh chóng tìm nơi nào đó để trốn",
        "ipa": "/məst kˈwɪkli faɪnd ˈsəmˌwɛr tɪ haɪd/"
      },
      {
        "id": 83,
        "startTime": 291.0,
        "endTime": 296.68,
        "en_text": "before Peppa finishes counting one",
        "vi_text": "trước khi Peppa đếm xong một",
        "ipa": "/ˌbiˈfɔr peppa* ˈfɪnɪʃɪz ˈkaʊntɪŋ wən/"
      },
      {
        "id": 84,
        "startTime": 294.96,
        "endTime": 298.32,
        "en_text": "2",
        "vi_text": "2",
        "ipa": "/2/"
      },
      {
        "id": 85,
        "startTime": 296.68,
        "endTime": 301.44,
        "en_text": "3",
        "vi_text": "3",
        "ipa": "/3/"
      },
      {
        "id": 86,
        "startTime": 298.32,
        "endTime": 305.68,
        "en_text": "4 5",
        "vi_text": "4 5",
        "ipa": "/4 5/"
      },
      {
        "id": 87,
        "startTime": 301.44,
        "endTime": 310.04,
        "en_text": "6 s George has found somewhere to hide",
        "vi_text": "6 giây George đã tìm được nơi nào đó để trốn",
        "ipa": "/6 ɛs ʤɔrʤ həz faʊnd ˈsəmˌwɛr tɪ haɪd/"
      },
      {
        "id": 88,
        "startTime": 305.68,
        "endTime": 314.64,
        "en_text": "just in time 10 Ready or Not Here I",
        "vi_text": "đúng lúc 10 Sẵn sàng hay không Ở đây tôi",
        "ipa": "/ʤɪst ɪn taɪm 10 ˈrɛdi ər nɑt hir aɪ/"
      },
      {
        "id": 89,
        "startTime": 310.04,
        "endTime": 314.64,
        "en_text": "Come Peppa has to find where George is",
        "vi_text": "Đến đây Peppa phải tìm xem George ở đâu",
        "ipa": "/kəm peppa* həz tɪ faɪnd wɛr ʤɔrʤ ɪz/"
      },
      {
        "id": 90,
        "startTime": 315.68,
        "endTime": 323.36,
        "en_text": "hiding found you Peppa has found George",
        "vi_text": "đang trốn tìm thấy bạn Peppa đã tìm thấy George",
        "ipa": "/ˈhaɪdɪŋ faʊnd ju peppa* həz faʊnd ʤɔrʤ/"
      },
      {
        "id": 91,
        "startTime": 320.04,
        "endTime": 326.72,
        "en_text": "George I could see you too",
        "vi_text": "George tôi cũng có thể nhìn thấy bạn",
        "ipa": "/ʤɔrʤ aɪ kʊd si ju tu/"
      },
      {
        "id": 92,
        "startTime": 323.36,
        "endTime": 330.2,
        "en_text": "easily now it is Peppa's turn to hide",
        "vi_text": "dễ dàng bây giờ đến lượt Peppa trốn",
        "ipa": "/ˈizəli naʊ ɪt ɪz peppa's* tərn tɪ haɪd/"
      },
      {
        "id": 93,
        "startTime": 326.72,
        "endTime": 332.2,
        "en_text": "one um three",
        "vi_text": "một ừ ba",
        "ipa": "/wən əm θri/"
      },
      {
        "id": 94,
        "startTime": 330.2,
        "endTime": 333.8,
        "en_text": "I'll help George to",
        "vi_text": "Tôi sẽ giúp George",
        "ipa": "/aɪl hɛlp ʤɔrʤ tɪ/"
      },
      {
        "id": 95,
        "startTime": 332.2,
        "endTime": 335.6,
        "en_text": "count",
        "vi_text": "đếm",
        "ipa": "/kaʊnt/"
      },
      {
        "id": 96,
        "startTime": 333.8,
        "endTime": 337.56,
        "en_text": "1",
        "vi_text": "1",
        "ipa": "/1/"
      },
      {
        "id": 97,
        "startTime": 335.6,
        "endTime": 339.76,
        "en_text": "2",
        "vi_text": "2",
        "ipa": "/2/"
      },
      {
        "id": 98,
        "startTime": 337.56,
        "endTime": 341.8,
        "en_text": "3",
        "vi_text": "3",
        "ipa": "/3/"
      },
      {
        "id": 99,
        "startTime": 339.76,
        "endTime": 343.76,
        "en_text": "4",
        "vi_text": "4",
        "ipa": "/4/"
      },
      {
        "id": 100,
        "startTime": 341.8,
        "endTime": 345.76,
        "en_text": "5",
        "vi_text": "5",
        "ipa": "/5/"
      },
      {
        "id": 101,
        "startTime": 343.76,
        "endTime": 347.76,
        "en_text": "6",
        "vi_text": "6",
        "ipa": "/6/"
      },
      {
        "id": 102,
        "startTime": 345.76,
        "endTime": 349.76,
        "en_text": "7",
        "vi_text": "7",
        "ipa": "/7/"
      },
      {
        "id": 103,
        "startTime": 347.76,
        "endTime": 351.32,
        "en_text": "8",
        "vi_text": "8",
        "ipa": "/8/"
      },
      {
        "id": 104,
        "startTime": 349.76,
        "endTime": 355.8,
        "en_text": "9",
        "vi_text": "9",
        "ipa": "/9/"
      },
      {
        "id": 105,
        "startTime": 351.32,
        "endTime": 358.48,
        "en_text": "10 okay George open your",
        "vi_text": "10 được rồi George mở cửa đi",
        "ipa": "/10 ˌoʊˈkeɪ ʤɔrʤ ˈoʊpən jʊr/"
      },
      {
        "id": 106,
        "startTime": 355.8,
        "endTime": 361.16,
        "en_text": "eyes George has to find where Peppa is",
        "vi_text": "mắt George phải tìm Peppa ở đâu",
        "ipa": "/aɪz ʤɔrʤ həz tɪ faɪnd wɛr peppa* ɪz/"
      },
      {
        "id": 107,
        "startTime": 358.48,
        "endTime": 365.48,
        "en_text": "hiding",
        "vi_text": "trốn",
        "ipa": "/ˈhaɪdɪŋ/"
      },
      {
        "id": 108,
        "startTime": 361.16,
        "endTime": 367.2,
        "en_text": "oh Peppa isn't hiding under the",
        "vi_text": "ôi Peppa không trốn dưới mái nhà",
        "ipa": "/oʊ peppa* ˈɪzənt ˈhaɪdɪŋ ˈəndər ðə/"
      },
      {
        "id": 109,
        "startTime": 365.48,
        "endTime": 371.11,
        "en_text": "table",
        "vi_text": "bàn",
        "ipa": "/ˈteɪbəl/"
      },
      {
        "id": 110,
        "startTime": 367.2,
        "endTime": 381.75,
        "en_text": "George have you thought of looking",
        "vi_text": "George bạn đã nghĩ tới việc tìm kiếm chưa",
        "ipa": "/ʤɔrʤ hæv ju θɔt əv ˈlʊkɪŋ/"
      },
      {
        "id": 111,
        "startTime": 371.11,
        "endTime": 381.75,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 112,
        "startTime": 382.4,
        "endTime": 386.44,
        "en_text": "upstairs Peppa isn't under the",
        "vi_text": "trên lầu Peppa không ở dưới",
        "ipa": "/əpˈstɛrz peppa* ˈɪzənt ˈəndər ðə/"
      },
      {
        "id": 113,
        "startTime": 387.36,
        "endTime": 391.56,
        "en_text": "bed what was that strange",
        "vi_text": "giường cái gì mà lạ vậy",
        "ipa": "/bɛd wət wɑz ðət streɪnʤ/"
      },
      {
        "id": 114,
        "startTime": 395.0,
        "endTime": 399.2,
        "en_text": "noise Peppa isn't behind the",
        "vi_text": "tiếng ồn Peppa không đứng đằng sau",
        "ipa": "/nɔɪz peppa* ˈɪzənt bɪˈhaɪnd ðə/"
      },
      {
        "id": 115,
        "startTime": 399.32,
        "endTime": 405.68,
        "en_text": "curtain there is that strange noise",
        "vi_text": "tấm màn có tiếng động lạ đó",
        "ipa": "/ˈkərtən ðɛr ɪz ðət streɪnʤ nɔɪz/"
      },
      {
        "id": 116,
        "startTime": 401.96,
        "endTime": 405.68,
        "en_text": "again what can it",
        "vi_text": "một lần nữa nó có thể là gì",
        "ipa": "/əˈgɛn wət kən ɪt/"
      },
      {
        "id": 117,
        "startTime": 412.08,
        "endTime": 417.8,
        "en_text": "be George has found where Peppa was",
        "vi_text": "George đã tìm thấy Peppa ở đâu",
        "ipa": "/bi ʤɔrʤ həz faʊnd wɛr peppa* wɑz/"
      },
      {
        "id": 118,
        "startTime": 414.8,
        "endTime": 417.8,
        "en_text": "hiding",
        "vi_text": "trốn",
        "ipa": "/ˈhaɪdɪŋ/"
      },
      {
        "id": 119,
        "startTime": 420.16,
        "endTime": 426.12,
        "en_text": "George found me now it's Daddy's turn to",
        "vi_text": "George đã tìm thấy tôi bây giờ đến lượt bố",
        "ipa": "/ʤɔrʤ faʊnd mi naʊ ɪts ˈdædiz tərn tɪ/"
      },
      {
        "id": 120,
        "startTime": 423.52,
        "endTime": 427.48,
        "en_text": "hide oh I think George should have",
        "vi_text": "trốn đi ồ tôi nghĩ George nên làm thế",
        "ipa": "/haɪd oʊ aɪ θɪŋk ʤɔrʤ ʃʊd hæv/"
      },
      {
        "id": 121,
        "startTime": 426.12,
        "endTime": 430.4,
        "en_text": "another",
        "vi_text": "khác",
        "ipa": "/əˈnəðər/"
      },
      {
        "id": 122,
        "startTime": 427.48,
        "endTime": 432.92,
        "en_text": "turn but George isn't very good at",
        "vi_text": "quay lại nhưng George không giỏi lắm",
        "ipa": "/tərn bət ʤɔrʤ ˈɪzənt ˈvɛri gʊd æt/"
      },
      {
        "id": 123,
        "startTime": 430.4,
        "endTime": 435.72,
        "en_text": "hiding I'm sure he'll be better this",
        "vi_text": "trốn tôi chắc chắn anh ấy sẽ tốt hơn thế này",
        "ipa": "/ˈhaɪdɪŋ əm ʃʊr hil bi ˈbɛtər ðɪs/"
      },
      {
        "id": 124,
        "startTime": 432.92,
        "endTime": 437.44,
        "en_text": "time close your eyes and start",
        "vi_text": "đã đến lúc nhắm mắt lại và bắt đầu",
        "ipa": "/taɪm kloʊz jʊr aɪz ənd stɑrt/"
      },
      {
        "id": 125,
        "startTime": 435.72,
        "endTime": 439.24,
        "en_text": "counting",
        "vi_text": "đếm",
        "ipa": "/ˈkaʊntɪŋ/"
      },
      {
        "id": 126,
        "startTime": 437.44,
        "endTime": 443.36,
        "en_text": "one",
        "vi_text": "một",
        "ipa": "/wən/"
      },
      {
        "id": 127,
        "startTime": 439.24,
        "endTime": 444.96,
        "en_text": "two oh dear Peppa will easily find",
        "vi_text": "hai ôi Peppa thân yêu sẽ dễ dàng tìm thấy",
        "ipa": "/tu oʊ dɪr peppa* wɪl ˈizəli faɪnd/"
      },
      {
        "id": 128,
        "startTime": 443.36,
        "endTime": 449.24,
        "en_text": "George",
        "vi_text": "George",
        "ipa": "/ʤɔrʤ/"
      },
      {
        "id": 129,
        "startTime": 444.96,
        "endTime": 450.76,
        "en_text": "five George come over here seven",
        "vi_text": "năm George đến đây bảy",
        "ipa": "/faɪv ʤɔrʤ kəm ˈoʊvər hir ˈsɛvən/"
      },
      {
        "id": 130,
        "startTime": 449.24,
        "endTime": 452.6,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 131,
        "startTime": 450.76,
        "endTime": 458.48,
        "en_text": "eight",
        "vi_text": "tám",
        "ipa": "/eɪt/"
      },
      {
        "id": 132,
        "startTime": 452.6,
        "endTime": 458.48,
        "en_text": "9 10 Ready or Not Here I",
        "vi_text": "9 10 Sẵn sàng hay chưa Ở đây tôi",
        "ipa": "/9 10 ˈrɛdi ər nɑt hir aɪ/"
      },
      {
        "id": 133,
        "startTime": 459.12,
        "endTime": 466.68,
        "en_text": "Come Oh George isn't hiding under the",
        "vi_text": "Thôi nào, Oh George không trốn dưới",
        "ipa": "/kəm oʊ ʤɔrʤ ˈɪzənt ˈhaɪdɪŋ ˈəndər ðə/"
      },
      {
        "id": 134,
        "startTime": 463.24,
        "endTime": 470.4,
        "en_text": "table but George always hides under the",
        "vi_text": "bàn nhưng George luôn trốn dưới bàn",
        "ipa": "/ˈteɪbəl bət ʤɔrʤ ˈɔlˌweɪz haɪdz ˈəndər ðə/"
      },
      {
        "id": 135,
        "startTime": 466.68,
        "endTime": 474.32,
        "en_text": "table have you thought of looking",
        "vi_text": "cái bàn bạn đã nghĩ đến việc tìm kiếm chưa",
        "ipa": "/ˈteɪbəl hæv ju θɔt əv ˈlʊkɪŋ/"
      },
      {
        "id": 136,
        "startTime": 470.4,
        "endTime": 474.32,
        "en_text": "upstairs I know where he",
        "vi_text": "trên lầu tôi biết anh ấy ở đâu",
        "ipa": "/əpˈstɛrz aɪ noʊ wɛr hi/"
      },
      {
        "id": 137,
        "startTime": 474.48,
        "endTime": 481.88,
        "en_text": "is George is in the toy basket",
        "vi_text": "George có ở trong giỏ đồ chơi không",
        "ipa": "/ɪz ʤɔrʤ ɪz ɪn ðə tɔɪ ˈbæskət/"
      },
      {
        "id": 138,
        "startTime": 479.25,
        "endTime": 485.2,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 139,
        "startTime": 481.88,
        "endTime": 487.0,
        "en_text": "oh George is not in the toy basket where",
        "vi_text": "ôi George không có trong giỏ đồ chơi đâu",
        "ipa": "/oʊ ʤɔrʤ ɪz nɑt ɪn ðə tɔɪ ˈbæskət wɛr/"
      },
      {
        "id": 140,
        "startTime": 485.2,
        "endTime": 489.88,
        "en_text": "can he",
        "vi_text": "anh ấy có thể",
        "ipa": "/kən hi/"
      },
      {
        "id": 141,
        "startTime": 487.0,
        "endTime": 493.44,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 142,
        "startTime": 489.88,
        "endTime": 497.04,
        "en_text": "be Peppa cannot find George anywhere",
        "vi_text": "Peppa không thể tìm thấy George ở đâu cả",
        "ipa": "/bi peppa* ˈkænɑt faɪnd ʤɔrʤ ˈɛniˌwɛr/"
      },
      {
        "id": 143,
        "startTime": 493.44,
        "endTime": 502.48,
        "en_text": "Daddy I can't find George",
        "vi_text": "Bố ơi con không tìm thấy George",
        "ipa": "/ˈdædi aɪ kænt faɪnd ʤɔrʤ/"
      },
      {
        "id": 144,
        "startTime": 497.04,
        "endTime": 502.48,
        "en_text": "anywhere oh dear I wonder where he can",
        "vi_text": "bất cứ nơi nào ôi trời ơi tôi tự hỏi anh ấy có thể ở đâu",
        "ipa": "/ˈɛniˌwɛr oʊ dɪr aɪ ˈwəndər wɛr hi kən/"
      },
      {
        "id": 145,
        "startTime": 505.4,
        "endTime": 511.44,
        "en_text": "be actually I think there's something",
        "vi_text": "thực ra tôi nghĩ có điều gì đó",
        "ipa": "/bi ˈæˌkʧuəli aɪ θɪŋk ðɛrz ˈsəmθɪŋ/"
      },
      {
        "id": 146,
        "startTime": 508.24,
        "endTime": 511.44,
        "en_text": "about George in this new",
        "vi_text": "về George trong cái mới này",
        "ipa": "/əˈbaʊt ʤɔrʤ ɪn ðɪs nu/"
      },
      {
        "id": 147,
        "startTime": 512.28,
        "endTime": 516.3,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 148,
        "startTime": 516.88,
        "endTime": 526.36,
        "en_text": "paper George found",
        "vi_text": "giấy George tìm thấy",
        "ipa": "/ˈpeɪpər ʤɔrʤ faʊnd/"
      },
      {
        "id": 149,
        "startTime": 520.92,
        "endTime": 528.88,
        "en_text": "you oh George that was a good place to",
        "vi_text": "bạn ơi George đó là một nơi tốt để",
        "ipa": "/ju oʊ ʤɔrʤ ðət wɑz ə gʊd pleɪs tɪ/"
      },
      {
        "id": 150,
        "startTime": 526.36,
        "endTime": 533.44,
        "en_text": "hide George was hiding behind Daddy",
        "vi_text": "trốn đi George đang trốn đằng sau bố",
        "ipa": "/haɪd ʤɔrʤ wɑz ˈhaɪdɪŋ bɪˈhaɪnd ˈdædi/"
      },
      {
        "id": 151,
        "startTime": 528.88,
        "endTime": 533.44,
        "en_text": "Pig's newspaper all the time",
        "vi_text": "Báo lợn mọi lúc mọi nơi",
        "ipa": "/pɪgz ˈnuzˌpeɪpər ɔl ðə taɪm/"
      },
      {
        "id": 152,
        "startTime": 533.87,
        "endTime": 538.41,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 153,
        "startTime": 540.96,
        "endTime": 549.28,
        "en_text": "the olden days suie sheep has come to",
        "vi_text": "ngày xưa cừu suie đã đến",
        "ipa": "/ðə ˈoʊldən deɪz suie* ʃip həz kəm tɪ/"
      },
      {
        "id": 154,
        "startTime": 544.72,
        "endTime": 553.08,
        "en_text": "play at Peppa's house hello Suzy hello",
        "vi_text": "chơi ở nhà Peppa xin chào Suzy xin chào",
        "ipa": "/pleɪ æt peppa's* haʊs hɛˈloʊ ˈsuzi hɛˈloʊ/"
      },
      {
        "id": 155,
        "startTime": 549.28,
        "endTime": 557.68,
        "en_text": "Peppa I've got something to show you",
        "vi_text": "Peppa tôi có thứ này muốn cho bạn xem",
        "ipa": "/peppa* aɪv gɑt ˈsəmθɪŋ tɪ ʃoʊ ju/"
      },
      {
        "id": 156,
        "startTime": 553.08,
        "endTime": 559.68,
        "en_text": "look what is it it's a photograph who do",
        "vi_text": "nhìn xem nó là gì đó là một bức ảnh ai làm",
        "ipa": "/lʊk wət ɪz ɪt ɪts ə ˈfoʊtəˌgræf hu du/"
      },
      {
        "id": 157,
        "startTime": 557.68,
        "endTime": 564.64,
        "en_text": "you think it",
        "vi_text": "bạn nghĩ nó",
        "ipa": "/ju θɪŋk ɪt/"
      },
      {
        "id": 158,
        "startTime": 559.68,
        "endTime": 567.4,
        "en_text": "is it's a baby sheep it's",
        "vi_text": "có phải nó là một con cừu con không",
        "ipa": "/ɪz ɪts ə ˈbeɪbi ʃip ɪts/"
      },
      {
        "id": 159,
        "startTime": 564.64,
        "endTime": 572.36,
        "en_text": "me you're not a",
        "vi_text": "tôi bạn không phải là một",
        "ipa": "/mi jʊr nɑt ə/"
      },
      {
        "id": 160,
        "startTime": 567.4,
        "endTime": 576.52,
        "en_text": "baby it's an old photo when I was a baby",
        "vi_text": "em yêu, đó là một bức ảnh cũ khi em còn nhỏ",
        "ipa": "/ˈbeɪbi ɪts ən oʊld ˈfoʊˌtoʊ wɪn aɪ wɑz ə ˈbeɪbi/"
      },
      {
        "id": 161,
        "startTime": 572.36,
        "endTime": 580.84,
        "en_text": "don't be silly Suzy in the olden days",
        "vi_text": "Đừng ngốc nghếch nữa Suzy ngày xưa",
        "ipa": "/doʊnt bi ˈsɪli ˈsuzi ɪn ðə ˈoʊldən deɪz/"
      },
      {
        "id": 162,
        "startTime": 576.52,
        "endTime": 585.04,
        "en_text": "you were a baby too Peppa no I wasn't",
        "vi_text": "bạn cũng từng là một đứa bé Peppa không, tôi không phải",
        "ipa": "/ju wər ə ˈbeɪbi tu peppa* noʊ aɪ ˈwəzənt/"
      },
      {
        "id": 163,
        "startTime": 580.84,
        "endTime": 587.92,
        "en_text": "yes you were ask your mommy mommy pig is",
        "vi_text": "vâng, bạn đã hỏi mẹ của bạn, con lợn của bạn là gì",
        "ipa": "/jɛs ju wər æsk jʊr ˈmɑmi ˈmɑmi pɪg ɪz/"
      },
      {
        "id": 164,
        "startTime": 585.04,
        "endTime": 592.24,
        "en_text": "working on the computer Mommy hello",
        "vi_text": "đang làm việc trên máy tính Mẹ ơi xin chào",
        "ipa": "/ˈwərkɪŋ ɔn ðə kəmˈpjutər ˈmɑmi hɛˈloʊ/"
      },
      {
        "id": 165,
        "startTime": 587.92,
        "endTime": 597.6,
        "en_text": "Peppa Susie is talking nonsense no I'm",
        "vi_text": "Peppa Susie đang nói điều vô nghĩa không, tôi đây",
        "ipa": "/peppa* ˈsuzi ɪz ˈtɔkɪŋ ˈnɑnsɛns noʊ əm/"
      },
      {
        "id": 166,
        "startTime": 592.24,
        "endTime": 601.88,
        "en_text": "not she said in the olden days I was a",
        "vi_text": "không phải ngày xưa cô ấy nói tôi là một",
        "ipa": "/nɑt ʃi sɛd ɪn ðə ˈoʊldən deɪz aɪ wɑz ə/"
      },
      {
        "id": 167,
        "startTime": 597.6,
        "endTime": 603.4,
        "en_text": "baby well you were pepper look here are",
        "vi_text": "em yêu, em thật là tiêu, nhìn đây này",
        "ipa": "/ˈbeɪbi wɛl ju wər ˈpɛpər lʊk hir ər/"
      },
      {
        "id": 168,
        "startTime": 601.88,
        "endTime": 606.64,
        "en_text": "some photos on the",
        "vi_text": "một số hình ảnh trên",
        "ipa": "/səm ˈfoʊˌtoʊz ɔn ðə/"
      },
      {
        "id": 169,
        "startTime": 603.4,
        "endTime": 610.4,
        "en_text": "computer who do you think that is it's",
        "vi_text": "máy tính bạn nghĩ đó là ai",
        "ipa": "/kəmˈpjutər hu du ju θɪŋk ðət ɪz ɪts/"
      },
      {
        "id": 170,
        "startTime": 606.64,
        "endTime": 614.16,
        "en_text": "Baby Alexander Baby Alexander is Peppa's",
        "vi_text": "Bé Alexander Bé Alexander là của Peppa",
        "ipa": "/ˈbeɪbi ˌælɪgˈzændər ˈbeɪbi ˌælɪgˈzændər ɪz peppa's*/"
      },
      {
        "id": 171,
        "startTime": 610.4,
        "endTime": 616.36,
        "en_text": "cousin no that's you as a baby Peppa",
        "vi_text": "anh họ không, đó là anh khi còn bé Peppa",
        "ipa": "/ˈkəzən noʊ ðæts ju ɛz ə ˈbeɪbi peppa*/"
      },
      {
        "id": 172,
        "startTime": 614.16,
        "endTime": 618.8,
        "en_text": "baby",
        "vi_text": "Đứa bé",
        "ipa": "/ˈbeɪbi/"
      },
      {
        "id": 173,
        "startTime": 616.36,
        "endTime": 622.44,
        "en_text": "Peppa somebody sounds like they're",
        "vi_text": "Peppa ai đó nghe có vẻ như họ",
        "ipa": "/peppa* ˈsəmˌbɑdi saʊnz laɪk ðɛr/"
      },
      {
        "id": 174,
        "startTime": 618.8,
        "endTime": 627.28,
        "en_text": "having fun look daddy that's a picture",
        "vi_text": "vui vẻ nhé bố ơi đó là một bức tranh",
        "ipa": "/ˈhævɪŋ fən lʊk ˈdædi ðæts ə ˈpɪkʧər/"
      },
      {
        "id": 175,
        "startTime": 622.44,
        "endTime": 630.52,
        "en_text": "of me as a baby I remember it well it",
        "vi_text": "của tôi khi còn là một đứa bé, tôi nhớ rất rõ điều đó",
        "ipa": "/əv mi ɛz ə ˈbeɪbi aɪ rɪˈmɛmbər ɪt wɛl ɪt/"
      },
      {
        "id": 176,
        "startTime": 627.28,
        "endTime": 633.72,
        "en_text": "was taken on our first day in this house",
        "vi_text": "được chụp vào ngày đầu tiên chúng tôi ở ngôi nhà này",
        "ipa": "/wɑz ˈteɪkən ɔn ɑr fərst deɪ ɪn ðɪs haʊs/"
      },
      {
        "id": 177,
        "startTime": 630.52,
        "endTime": 637.32,
        "en_text": "what do you mean when you were little we",
        "vi_text": "ý bạn là gì khi bạn còn nhỏ chúng tôi",
        "ipa": "/wət du ju min wɪn ju wər ˈlɪtəl wi/"
      },
      {
        "id": 178,
        "startTime": 633.72,
        "endTime": 640.92,
        "en_text": "moved into this house we brought all our",
        "vi_text": "chuyển đến ngôi nhà này chúng tôi đã mang theo tất cả",
        "ipa": "/muvd ˈɪntu ðɪs haʊs wi brɔt ɔl ɑr/"
      },
      {
        "id": 179,
        "startTime": 637.32,
        "endTime": 645.32,
        "en_text": "things on top of our",
        "vi_text": "những thứ trên hết của chúng tôi",
        "ipa": "/θɪŋz ɔn tɔp əv ɑr/"
      },
      {
        "id": 180,
        "startTime": 640.92,
        "endTime": 648.32,
        "en_text": "car mommy pig put some pictures up daddy",
        "vi_text": "xe ô tô mẹ lợn đưa vài hình ảnh lên bố đi",
        "ipa": "/kɑr ˈmɑmi pɪg pʊt səm ˈpɪkʧərz əp ˈdædi/"
      },
      {
        "id": 181,
        "startTime": 645.32,
        "endTime": 648.32,
        "en_text": "pig put up a",
        "vi_text": "con lợn đưa lên một",
        "ipa": "/pɪg pʊt əp ə/"
      },
      {
        "id": 182,
        "startTime": 648.36,
        "endTime": 653.04,
        "en_text": "shelf and Grandpa Pig made us a lovely",
        "vi_text": "kệ và ông nội lợn đã làm cho chúng tôi trở nên đáng yêu",
        "ipa": "/ʃɛlf ənd ˈgrændˌpɑ pɪg meɪd ˈjuˈɛs ə ˈləvli/"
      },
      {
        "id": 183,
        "startTime": 652.08,
        "endTime": 656.12,
        "en_text": "flower",
        "vi_text": "hoa",
        "ipa": "/flaʊər/"
      },
      {
        "id": 184,
        "startTime": 653.04,
        "endTime": 661.0,
        "en_text": "garden where's Grandpa's lovely flower",
        "vi_text": "khu vườn có bông hoa đáng yêu của ông nội ở đâu",
        "ipa": "/ˈgɑrdən wɛrz ˈgrænˌpɑz ˈləvli flaʊər/"
      },
      {
        "id": 185,
        "startTime": 656.12,
        "endTime": 663.52,
        "en_text": "garden now daddy pig looked after it uh",
        "vi_text": "khu vườn bây giờ bố lợn đang chăm sóc nó à",
        "ipa": "/ˈgɑrdən naʊ ˈdædi pɪg lʊkt ˈæftər ɪt ə/"
      },
      {
        "id": 186,
        "startTime": 661.0,
        "endTime": 666.76,
        "en_text": "we had the wrong kind of soil for",
        "vi_text": "chúng tôi đã chọn sai loại đất cho",
        "ipa": "/wi hæd ðə rɔŋ kaɪnd əv sɔɪl fər/"
      },
      {
        "id": 187,
        "startTime": 663.52,
        "endTime": 669.72,
        "en_text": "flowers oh and anyway you needed",
        "vi_text": "hoa ồ và dù sao thì bạn cũng cần",
        "ipa": "/flaʊərz oʊ ənd ˈɛniˌweɪ ju ˈnidɪd/"
      },
      {
        "id": 188,
        "startTime": 666.76,
        "endTime": 672.88,
        "en_text": "somewhere to play you and Susie love to",
        "vi_text": "nơi nào đó để chơi đùa mà bạn và Susie thích",
        "ipa": "/ˈsəmˌwɛr tɪ pleɪ ju ənd ˈsuzi ləv tɪ/"
      },
      {
        "id": 189,
        "startTime": 669.72,
        "endTime": 677.28,
        "en_text": "play in the garden was Susie my friend",
        "vi_text": "chơi trong vườn là Susie, bạn tôi",
        "ipa": "/pleɪ ɪn ðə ˈgɑrdən wɑz ˈsuzi maɪ frɛnd/"
      },
      {
        "id": 190,
        "startTime": 672.88,
        "endTime": 679.06,
        "en_text": "in the olden days yes you and Susie have",
        "vi_text": "ngày xưa vâng, bạn và Susie có",
        "ipa": "/ɪn ðə ˈoʊldən deɪz jɛs ju ənd ˈsuzi hæv/"
      },
      {
        "id": 191,
        "startTime": 677.28,
        "endTime": 684.11,
        "en_text": "always been best",
        "vi_text": "luôn luôn là tốt nhất",
        "ipa": "/ˈɔlˌweɪz bɪn bɛst/"
      },
      {
        "id": 192,
        "startTime": 679.06,
        "endTime": 684.11,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 193,
        "startTime": 685.48,
        "endTime": 693.24,
        "en_text": "friends in the olden days did sus let me",
        "vi_text": "bạn bè ngày xưa có cho phép tôi không",
        "ipa": "/frɛndz ɪn ðə ˈoʊldən deɪz dɪd səs lɛt mi/"
      },
      {
        "id": 194,
        "startTime": 689.72,
        "endTime": 696.24,
        "en_text": "jump up and down in muddy puddles no",
        "vi_text": "nhảy lên nhảy xuống vũng bùn không",
        "ipa": "/ʤəmp əp ənd daʊn ɪn ˈmədi ˈpədəlz noʊ/"
      },
      {
        "id": 195,
        "startTime": 693.24,
        "endTime": 700.12,
        "en_text": "Peppa you were babies you couldn't even",
        "vi_text": "Peppa bạn là những đứa trẻ bạn thậm chí không thể",
        "ipa": "/peppa* ju wər ˈbeɪbiz ju ˈkʊdənt ˈivɪn/"
      },
      {
        "id": 196,
        "startTime": 696.24,
        "endTime": 703.0,
        "en_text": "walk oh what did we",
        "vi_text": "đi bộ ồ chúng ta đã làm gì thế",
        "ipa": "/wɔk oʊ wət dɪd wi/"
      },
      {
        "id": 197,
        "startTime": 700.12,
        "endTime": 705.84,
        "en_text": "do you",
        "vi_text": "bạn có",
        "ipa": "/du ju/"
      },
      {
        "id": 198,
        "startTime": 703.0,
        "endTime": 708.28,
        "en_text": "cried you",
        "vi_text": "bạn đã khóc",
        "ipa": "/kraɪd ju/"
      },
      {
        "id": 199,
        "startTime": 705.84,
        "endTime": 715.6,
        "en_text": "burped and you",
        "vi_text": "ợ và bạn",
        "ipa": "/burped* ənd ju/"
      },
      {
        "id": 200,
        "startTime": 708.28,
        "endTime": 720.04,
        "en_text": "laughed we were babies baby Suzy baby",
        "vi_text": "cười lớn chúng ta là em bé em yêu Suzy em yêu",
        "ipa": "/læft wi wər ˈbeɪbiz ˈbeɪbi ˈsuzi ˈbeɪbi/"
      },
      {
        "id": 201,
        "startTime": 715.6,
        "endTime": 722.92,
        "en_text": "Peppa goo Gago Gaga",
        "vi_text": "Peppa goo Gago Gaga",
        "ipa": "/peppa* gu gago* ˈgɑˌgə/"
      },
      {
        "id": 202,
        "startTime": 720.04,
        "endTime": 726.52,
        "en_text": "soon after that you were",
        "vi_text": "ngay sau đó bạn đã",
        "ipa": "/sun ˈæftər ðət ju wər/"
      },
      {
        "id": 203,
        "startTime": 722.92,
        "endTime": 729.72,
        "en_text": "Toddlers and where was George he was a",
        "vi_text": "Những đứa trẻ mới biết đi và George anh ấy ở đâu",
        "ipa": "/ˈtɑdlərz ənd wɛr wɑz ʤɔrʤ hi wɑz ə/"
      },
      {
        "id": 204,
        "startTime": 726.52,
        "endTime": 729.72,
        "en_text": "baby in my",
        "vi_text": "em yêu trong tôi",
        "ipa": "/ˈbeɪbi ɪn maɪ/"
      },
      {
        "id": 205,
        "startTime": 729.76,
        "endTime": 737.32,
        "en_text": "tummy yes you were in my tummy George",
        "vi_text": "bụng vâng, bạn ở trong bụng tôi George",
        "ipa": "/ˈtəmi jɛs ju wər ɪn maɪ ˈtəmi ʤɔrʤ/"
      },
      {
        "id": 206,
        "startTime": 733.72,
        "endTime": 742.44,
        "en_text": "you've got a big tummy daddy is there a",
        "vi_text": "bố có cái bụng to phải không bố?",
        "ipa": "/juv gɑt ə bɪg ˈtəmi ˈdædi ɪz ðɛr ə/"
      },
      {
        "id": 207,
        "startTime": 737.32,
        "endTime": 744.84,
        "en_text": "baby in there oh ho no Peppa this tummy",
        "vi_text": "em yêu trong đó ôi ho không Peppa cái bụng này",
        "ipa": "/ˈbeɪbi ɪn ðɛr oʊ hoʊ noʊ peppa* ðɪs ˈtəmi/"
      },
      {
        "id": 208,
        "startTime": 742.44,
        "endTime": 749.88,
        "en_text": "is pure",
        "vi_text": "tinh khiết",
        "ipa": "/ɪz pjʊr/"
      },
      {
        "id": 209,
        "startTime": 744.84,
        "endTime": 752.52,
        "en_text": "muscle and so George was born",
        "vi_text": "cơ bắp và thế là George được sinh ra",
        "ipa": "/ˈməsəl ənd soʊ ʤɔrʤ wɑz bɔrn/"
      },
      {
        "id": 210,
        "startTime": 749.88,
        "endTime": 755.2,
        "en_text": "and Granny and Grandpa gave George a",
        "vi_text": "và bà nội và ông nội đã đưa cho George một",
        "ipa": "/ənd ˈgræni ənd ˈgrændˌpɑ geɪv ʤɔrʤ ə/"
      },
      {
        "id": 211,
        "startTime": 752.52,
        "endTime": 758.24,
        "en_text": "very special present can you guess what",
        "vi_text": "món quà rất đặc biệt bạn có đoán được không",
        "ipa": "/ˈvɛri ˈspɛʃəl ˈprɛzənt kən ju gɛs wət/"
      },
      {
        "id": 212,
        "startTime": 755.2,
        "endTime": 761.84,
        "en_text": "it was Mr",
        "vi_text": "đó là ông",
        "ipa": "/ɪt wɑz ˈmɪstər/"
      },
      {
        "id": 213,
        "startTime": 758.24,
        "endTime": 761.84,
        "en_text": "Dinosaur that's",
        "vi_text": "Khủng long đó",
        "ipa": "/ˈdaɪnəˌsɔr ðæts/"
      },
      {
        "id": 214,
        "startTime": 762.36,
        "endTime": 769.36,
        "en_text": "right and you and suie were running and",
        "vi_text": "đúng rồi, bạn và Suie đang chạy và",
        "ipa": "/raɪt ənd ju ənd suie* wər ˈrənɪŋ ənd/"
      },
      {
        "id": 215,
        "startTime": 765.92,
        "endTime": 772.92,
        "en_text": "jumping around than",
        "vi_text": "nhảy xung quanh hơn",
        "ipa": "/ˈʤəmpɪŋ əraʊnd ðən/"
      },
      {
        "id": 216,
        "startTime": 769.36,
        "endTime": 776.48,
        "en_text": "you then one day you saw something",
        "vi_text": "bạn rồi một ngày bạn nhìn thấy một cái gì đó",
        "ipa": "/ju ðɛn wən deɪ ju sɔ ˈsəmθɪŋ/"
      },
      {
        "id": 217,
        "startTime": 772.92,
        "endTime": 776.48,
        "en_text": "amazing monkey",
        "vi_text": "con khỉ tuyệt vời",
        "ipa": "/əˈmeɪzɪŋ ˈməŋki/"
      },
      {
        "id": 218,
        "startTime": 776.8,
        "endTime": 784.16,
        "en_text": "pgle Peppa if you jump in mdy puddles",
        "vi_text": "hãy cầu xin Peppa nếu bạn nhảy vào vũng nước mdy",
        "ipa": "/pgle* peppa* ɪf ju ʤəmp ɪn mdy* ˈpədəlz/"
      },
      {
        "id": 219,
        "startTime": 780.8,
        "endTime": 784.16,
        "en_text": "you must wear your",
        "vi_text": "bạn phải mặc",
        "ipa": "/ju məst wɛr jʊr/"
      },
      {
        "id": 220,
        "startTime": 785.28,
        "endTime": 792.56,
        "en_text": "boots you loved jumping up and down in",
        "vi_text": "đôi ủng bạn thích nhảy lên nhảy xuống",
        "ipa": "/buts ju ləvd ˈʤəmpɪŋ əp ənd daʊn ɪn/"
      },
      {
        "id": 221,
        "startTime": 788.32,
        "endTime": 792.56,
        "en_text": "muddy puddles I still",
        "vi_text": "những vũng bùn tôi vẫn còn",
        "ipa": "/ˈmədi ˈpədəlz aɪ stɪl/"
      },
      {
        "id": 222,
        "startTime": 792.65,
        "endTime": 799.04,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 223,
        "startTime": 794.92,
        "endTime": 799.04,
        "en_text": "do let's take a photo",
        "vi_text": "chúng ta hãy chụp ảnh nhé",
        "ipa": "/du lɛts teɪk ə ˈfoʊˌtoʊ/"
      },
      {
        "id": 224,
        "startTime": 799.12,
        "endTime": 803.6,
        "en_text": "Now Peppa loves jumping up and down in",
        "vi_text": "Bây giờ Peppa thích nhảy lên nhảy xuống",
        "ipa": "/naʊ peppa* ləvz ˈʤəmpɪŋ əp ənd daʊn ɪn/"
      },
      {
        "id": 225,
        "startTime": 802.0,
        "endTime": 806.44,
        "en_text": "muddy",
        "vi_text": "lầy lội",
        "ipa": "/ˈmədi/"
      },
      {
        "id": 226,
        "startTime": 803.6,
        "endTime": 810.52,
        "en_text": "puddles Peppa has always loved jumping",
        "vi_text": "vũng nước Peppa luôn thích nhảy",
        "ipa": "/ˈpədəlz peppa* həz ˈɔlˌweɪz ləvd ˈʤəmpɪŋ/"
      },
      {
        "id": 227,
        "startTime": 806.44,
        "endTime": 810.52,
        "en_text": "up and down in muddy puddles",
        "vi_text": "lên xuống trong vũng bùn",
        "ipa": "/əp ənd daʊn ɪn ˈmədi ˈpədəlz/"
      },
      {
        "id": 228,
        "startTime": 811.48,
        "endTime": 819.04,
        "en_text": "fruit it is fruit day at the supermarket",
        "vi_text": "trái cây đó là ngày trái cây ở siêu thị",
        "ipa": "/frut ɪt ɪz frut deɪ æt ðə ˈsupərˌmɑrkɪt/"
      },
      {
        "id": 229,
        "startTime": 815.08,
        "endTime": 822.92,
        "en_text": "look it's Mr Potato Mrs carrot sweet",
        "vi_text": "nhìn đây là Mr Potato Bà cà rốt ngọt ngào",
        "ipa": "/lʊk ɪts ˈmɪstər pəˈteɪˌtoʊ ˈmɪsɪz ˈkɛrət swit/"
      },
      {
        "id": 230,
        "startTime": 819.04,
        "endTime": 822.92,
        "en_text": "cranberry and Little",
        "vi_text": "nam việt quất và nhỏ",
        "ipa": "/ˈkrænˌbɛri ənd ˈlɪtəl/"
      },
      {
        "id": 231,
        "startTime": 822.96,
        "endTime": 829.6,
        "en_text": "Sprouts Apple orange",
        "vi_text": "Mầm táo cam",
        "ipa": "/spraʊts ˈæpəl ˈɔrɪnʤ/"
      },
      {
        "id": 232,
        "startTime": 825.48,
        "endTime": 833.68,
        "en_text": "ban and pineapple to eat five pieces of",
        "vi_text": "cấm và dứa ăn năm miếng",
        "ipa": "/bæn ənd ˈpaɪˌnæpəl tɪ it faɪv ˈpisɪz əv/"
      },
      {
        "id": 233,
        "startTime": 829.6,
        "endTime": 838.16,
        "en_text": "fruit a day because they're good for",
        "vi_text": "trái cây mỗi ngày vì chúng tốt cho",
        "ipa": "/frut ə deɪ bɪˈkəz ðɛr gʊd fər/"
      },
      {
        "id": 234,
        "startTime": 833.68,
        "endTime": 841.4,
        "en_text": "you welcome to fruit day where the magic",
        "vi_text": "chào mừng bạn đến với ngày trái cây nơi có điều kỳ diệu",
        "ipa": "/ju ˈwɛlkəm tɪ frut deɪ wɛr ðə ˈmæʤɪk/"
      },
      {
        "id": 235,
        "startTime": 838.16,
        "endTime": 844.44,
        "en_text": "of fruit never",
        "vi_text": "trái cây không bao giờ",
        "ipa": "/əv frut ˈnɛvər/"
      },
      {
        "id": 236,
        "startTime": 841.4,
        "endTime": 848.8,
        "en_text": "ends wow so much",
        "vi_text": "kết thúc wow quá nhiều",
        "ipa": "/ɛndz waʊ soʊ məʧ/"
      },
      {
        "id": 237,
        "startTime": 844.44,
        "endTime": 852.8,
        "en_text": "fruit hello pepp hello we are choosing",
        "vi_text": "trái cây xin chào pepp xin chào chúng tôi đang chọn",
        "ipa": "/frut hɛˈloʊ pepp* hɛˈloʊ wi ər ˈʧuzɪŋ/"
      },
      {
        "id": 238,
        "startTime": 848.8,
        "endTime": 857.92,
        "en_text": "our favorite fruit what's your favorite",
        "vi_text": "trái cây yêu thích của chúng tôi bạn thích món gì nhất",
        "ipa": "/ɑr ˈfeɪvərɪt frut wəts jʊr ˈfeɪvərɪt/"
      },
      {
        "id": 239,
        "startTime": 852.8,
        "endTime": 862.28,
        "en_text": "um I like apples I like oranges I like",
        "vi_text": "ừm tôi thích táo tôi thích cam tôi thích",
        "ipa": "/əm aɪ laɪk ˈæpəlz aɪ laɪk ˈɔrɪnʤɪz aɪ laɪk/"
      },
      {
        "id": 240,
        "startTime": 857.92,
        "endTime": 866.56,
        "en_text": "bananas I like carrots carrots are not a",
        "vi_text": "chuối tôi thích cà rốt cà rốt không phải là",
        "ipa": "/bəˈnænəz aɪ laɪk ˈkɛrəts ˈkɛrəts ər nɑt ə/"
      },
      {
        "id": 241,
        "startTime": 862.28,
        "endTime": 870.12,
        "en_text": "fruit oh carrots are a",
        "vi_text": "trái cây ôi cà rốt là một",
        "ipa": "/frut oʊ ˈkɛrəts ər ə/"
      },
      {
        "id": 242,
        "startTime": 866.56,
        "endTime": 874.08,
        "en_text": "vegetable Edmund is a bit of a CL clogs",
        "vi_text": "rau Edmund là một chút guốc CL",
        "ipa": "/ˈvɛʤtəbəl ˈɛdmənd ɪz ə bɪt əv ə cl* klɑgz/"
      },
      {
        "id": 243,
        "startTime": 870.12,
        "endTime": 876.2,
        "en_text": "what's your favorite fruit George is it",
        "vi_text": "trái cây yêu thích của bạn là gì George phải không?",
        "ipa": "/wəts jʊr ˈfeɪvərɪt frut ʤɔrʤ ɪz ɪt/"
      },
      {
        "id": 244,
        "startTime": 874.08,
        "endTime": 879.52,
        "en_text": "bananas or",
        "vi_text": "chuối hoặc",
        "ipa": "/bəˈnænəz ər/"
      },
      {
        "id": 245,
        "startTime": 876.2,
        "endTime": 884.2,
        "en_text": "oranges George likes strawberries the",
        "vi_text": "cam George thích dâu tây",
        "ipa": "/ˈɔrɪnʤɪz ʤɔrʤ laɪks ˈstrɔˌbɛriz ðə/"
      },
      {
        "id": 246,
        "startTime": 879.52,
        "endTime": 888.04,
        "en_text": "best STW George loves strawberries",
        "vi_text": "STW tốt nhất George thích dâu tây",
        "ipa": "/bɛst stw* ʤɔrʤ ləvz ˈstrɔˌbɛriz/"
      },
      {
        "id": 247,
        "startTime": 884.2,
        "endTime": 892.4,
        "en_text": "smoothies get your fruit smoothies",
        "vi_text": "sinh tố lấy sinh tố trái cây của bạn",
        "ipa": "/smoothies* gɪt jʊr frut smoothies*/"
      },
      {
        "id": 248,
        "startTime": 888.04,
        "endTime": 895.6,
        "en_text": "here hello Miss Rabbit what's a fruit",
        "vi_text": "đây xin chào cô Thỏ trái cây là gì",
        "ipa": "/hir hɛˈloʊ mɪs ˈræbɪt wəts ə frut/"
      },
      {
        "id": 249,
        "startTime": 892.4,
        "endTime": 899.08,
        "en_text": "smoothie it's a drink made from fruit",
        "vi_text": "sinh tố nó là một thức uống làm từ trái cây",
        "ipa": "/smoothie* ɪts ə drɪŋk meɪd frəm frut/"
      },
      {
        "id": 250,
        "startTime": 895.6,
        "endTime": 901.36,
        "en_text": "would you like one yes please can I have",
        "vi_text": "bạn có muốn một cái không, làm ơn cho tôi một cái được không",
        "ipa": "/wʊd ju laɪk wən jɛs pliz kən aɪ hæv/"
      },
      {
        "id": 251,
        "startTime": 899.08,
        "endTime": 904.32,
        "en_text": "have a smoothie with",
        "vi_text": "uống sinh tố với",
        "ipa": "/hæv ə smoothie* wɪθ/"
      },
      {
        "id": 252,
        "startTime": 901.36,
        "endTime": 908.64,
        "en_text": "apples okay but smoothies can have lots",
        "vi_text": "táo thì được nhưng sinh tố có thể có rất nhiều",
        "ipa": "/ˈæpəlz ˌoʊˈkeɪ bət smoothies* kən hæv lɑts/"
      },
      {
        "id": 253,
        "startTime": 904.32,
        "endTime": 913.56,
        "en_text": "of different fruits in them okay apples",
        "vi_text": "các loại trái cây khác nhau trong đó táo được rồi",
        "ipa": "/əv ˈdɪfərənt fruts ɪn ðɛm ˌoʊˈkeɪ ˈæpəlz/"
      },
      {
        "id": 254,
        "startTime": 908.64,
        "endTime": 917.28,
        "en_text": "raspberries bananas and more",
        "vi_text": "quả mâm xôi chuối và hơn thế nữa",
        "ipa": "/ˈræzˌbɛriz bəˈnænəz ənd mɔr/"
      },
      {
        "id": 255,
        "startTime": 913.56,
        "endTime": 919.76,
        "en_text": "apples an apple raspberry banana and",
        "vi_text": "táo một quả táo mâm xôi chuối và",
        "ipa": "/ˈæpəlz ən ˈæpəl ˈræzˌbɛri bəˈnænə ənd/"
      },
      {
        "id": 256,
        "startTime": 917.28,
        "endTime": 922.6,
        "en_text": "more apples",
        "vi_text": "thêm táo",
        "ipa": "/mɔr ˈæpəlz/"
      },
      {
        "id": 257,
        "startTime": 919.76,
        "endTime": 925.96,
        "en_text": "smoothie M",
        "vi_text": "sinh tố M",
        "ipa": "/smoothie* ɛm/"
      },
      {
        "id": 258,
        "startTime": 922.6,
        "endTime": 929.6,
        "en_text": "delicious can I have a smoothie please",
        "vi_text": "ngon quá, tôi có thể uống sinh tố được không",
        "ipa": "/dɪˈlɪʃəs kən aɪ hæv ə smoothie* pliz/"
      },
      {
        "id": 259,
        "startTime": 925.96,
        "endTime": 932.28,
        "en_text": "me too and me and me of course what",
        "vi_text": "tôi cũng vậy và tôi và tôi tất nhiên là gì",
        "ipa": "/mi tu ənd mi ənd mi əv kɔrs wət/"
      },
      {
        "id": 260,
        "startTime": 929.6,
        "endTime": 935.84,
        "en_text": "fruit would you like in your smoothies",
        "vi_text": "loại trái cây bạn muốn cho vào sinh tố của mình",
        "ipa": "/frut wʊd ju laɪk ɪn jʊr smoothies*/"
      },
      {
        "id": 261,
        "startTime": 932.28,
        "endTime": 937.88,
        "en_text": "uh I don't know it can be anything Pedro",
        "vi_text": "ừ tôi không biết nó có thể là gì đó Pedro",
        "ipa": "/ə aɪ doʊnt noʊ ɪt kən bi ˈɛniˌθɪŋ ˈpeɪdroʊ/"
      },
      {
        "id": 262,
        "startTime": 935.84,
        "endTime": 942.4,
        "en_text": "okay cheese",
        "vi_text": "được thôi phô mai",
        "ipa": "/ˌoʊˈkeɪ ʧiz/"
      },
      {
        "id": 263,
        "startTime": 937.88,
        "endTime": 944.72,
        "en_text": "please Pedro cheese isn't a fruit it has",
        "vi_text": "làm ơn phô mai Pedro không phải là trái cây mà nó có",
        "ipa": "/pliz ˈpeɪdroʊ ʧiz ˈɪzənt ə frut ɪt həz/"
      },
      {
        "id": 264,
        "startTime": 942.4,
        "endTime": 947.6,
        "en_text": "to be fruit or",
        "vi_text": "là trái cây hoặc",
        "ipa": "/tɪ bi frut ər/"
      },
      {
        "id": 265,
        "startTime": 944.72,
        "endTime": 950.04,
        "en_text": "vegetables okay raspberries and",
        "vi_text": "rau được quả mâm xôi và",
        "ipa": "/ˈvɛʤtəbəlz ˌoʊˈkeɪ ˈræzˌbɛriz ənd/"
      },
      {
        "id": 266,
        "startTime": 947.6,
        "endTime": 952.56,
        "en_text": "blueberries and blackberries and",
        "vi_text": "quả việt quất và quả mâm xôi và",
        "ipa": "/ˈbluˌbɛriz ənd ˈblækˌbɛriz ənd/"
      },
      {
        "id": 267,
        "startTime": 950.04,
        "endTime": 955.28,
        "en_text": "gooseberries that's more like it",
        "vi_text": "quả lý gai thì giống thế hơn",
        "ipa": "/ˈgusˌbɛriz ðæts mɔr laɪk ɪt/"
      },
      {
        "id": 268,
        "startTime": 952.56,
        "endTime": 959.24,
        "en_text": "raspberry and blueberry and blackberry",
        "vi_text": "mâm xôi và việt quất và dâu đen",
        "ipa": "/ˈræzˌbɛri ənd ˈbluˌbɛri ənd ˈblækˌbɛri/"
      },
      {
        "id": 269,
        "startTime": 955.28,
        "endTime": 962.4,
        "en_text": "and Gooseberry smoothies for everyone",
        "vi_text": "và sinh tố Gooseberry cho mọi người",
        "ipa": "/ənd ˈgusˌbɛri smoothies* fər ˈɛvriˌwən/"
      },
      {
        "id": 270,
        "startTime": 959.24,
        "endTime": 962.4,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 271,
        "startTime": 963.72,
        "endTime": 971.52,
        "en_text": "love what do you want in your smoothie",
        "vi_text": "yêu thích những gì bạn muốn trong sinh tố của bạn",
        "ipa": "/ləv wət du ju wɔnt ɪn jʊr smoothie*/"
      },
      {
        "id": 272,
        "startTime": 966.64,
        "endTime": 974.52,
        "en_text": "George strawbery George a smoothie must",
        "vi_text": "George dâu tây George một ly sinh tố phải",
        "ipa": "/ʤɔrʤ strawbery* ʤɔrʤ ə smoothie* məst/"
      },
      {
        "id": 273,
        "startTime": 971.52,
        "endTime": 978.8,
        "en_text": "have lots of fruit in it how about",
        "vi_text": "có rất nhiều trái cây trong đó thì sao",
        "ipa": "/hæv lɑts əv frut ɪn ɪt haʊ əˈbaʊt/"
      },
      {
        "id": 274,
        "startTime": 974.52,
        "endTime": 981.48,
        "en_text": "strawberries and pineapple George no",
        "vi_text": "dâu tây và dứa George no",
        "ipa": "/ˈstrɔˌbɛriz ənd ˈpaɪˌnæpəl ʤɔrʤ noʊ/"
      },
      {
        "id": 275,
        "startTime": 978.8,
        "endTime": 985.88,
        "en_text": "maybe George would like some dinosaur",
        "vi_text": "có lẽ George muốn vài con khủng long",
        "ipa": "/ˈmeɪbi ʤɔrʤ wʊd laɪk səm ˈdaɪnəˌsɔr/"
      },
      {
        "id": 276,
        "startTime": 981.48,
        "endTime": 989.04,
        "en_text": "juice dinosaur juice oh yes all",
        "vi_text": "nước trái cây nước ép khủng long ồ vâng tất cả",
        "ipa": "/ʤus ˈdaɪnəˌsɔr ʤus oʊ jɛs ɔl/"
      },
      {
        "id": 277,
        "startTime": 985.88,
        "endTime": 993.0,
        "en_text": "dinosaurs like dinosaur juice",
        "vi_text": "khủng long thích nước ép khủng long",
        "ipa": "/ˈdaɪnəˌsɔrz laɪk ˈdaɪnəˌsɔr ʤus/"
      },
      {
        "id": 278,
        "startTime": 989.04,
        "endTime": 996.56,
        "en_text": "I saw let's see a bit of this one of",
        "vi_text": "Tôi thấy chúng ta hãy xem một chút về cái này",
        "ipa": "/aɪ sɔ lɛts si ə bɪt əv ðɪs wən əv/"
      },
      {
        "id": 279,
        "startTime": 993.0,
        "endTime": 1000.32,
        "en_text": "those a few of these oh some of",
        "vi_text": "một vài trong số này ồ một số",
        "ipa": "/ðoʊz ə fju əv ðiz oʊ səm əv/"
      },
      {
        "id": 280,
        "startTime": 996.56,
        "endTime": 1002.96,
        "en_text": "that one dinosaur juice just for",
        "vi_text": "nước ép khủng long đó chỉ dành cho",
        "ipa": "/ðət wən ˈdaɪnəˌsɔr ʤus ʤɪst fər/"
      },
      {
        "id": 281,
        "startTime": 1000.32,
        "endTime": 1004.48,
        "en_text": "dinosaurs and their little",
        "vi_text": "khủng long và con nhỏ của chúng",
        "ipa": "/ˈdaɪnəˌsɔrz ənd ðɛr ˈlɪtəl/"
      },
      {
        "id": 282,
        "startTime": 1002.96,
        "endTime": 1008.0,
        "en_text": "friends",
        "vi_text": "bạn",
        "ipa": "/frɛndz/"
      },
      {
        "id": 283,
        "startTime": 1004.48,
        "endTime": 1012.12,
        "en_text": "dinosaur can I have some dinosaur juice",
        "vi_text": "khủng long cho tôi một ít nước ép khủng long được không",
        "ipa": "/ˈdaɪnəˌsɔr kən aɪ hæv səm ˈdaɪnəˌsɔr ʤus/"
      },
      {
        "id": 284,
        "startTime": 1008.0,
        "endTime": 1014.6,
        "en_text": "please Miss Rabbit me too and me and me",
        "vi_text": "làm ơn đi cô Thỏ, tôi cũng vậy và tôi và tôi",
        "ipa": "/pliz mɪs ˈræbɪt mi tu ənd mi ənd mi/"
      },
      {
        "id": 285,
        "startTime": 1012.12,
        "endTime": 1017.92,
        "en_text": "okay dinosaur juice for",
        "vi_text": "được rồi nước ép khủng long cho",
        "ipa": "/ˌoʊˈkeɪ ˈdaɪnəˌsɔr ʤus fər/"
      },
      {
        "id": 286,
        "startTime": 1014.6,
        "endTime": 1021.0,
        "en_text": "everyone oh bother what's wrong Miss",
        "vi_text": "mọi người ồ làm phiền có chuyện gì vậy cô",
        "ipa": "/ˈɛvriˌwən oʊ ˈbɑðər wəts rɔŋ mɪs/"
      },
      {
        "id": 287,
        "startTime": 1017.92,
        "endTime": 1024.76,
        "en_text": "Rabbit I've forgotten what I put in the",
        "vi_text": "Thỏ tôi đã quên những gì tôi đã bỏ vào",
        "ipa": "/ˈræbɪt aɪv fərˈgɑtən wət aɪ pʊt ɪn ðə/"
      },
      {
        "id": 288,
        "startTime": 1021.0,
        "endTime": 1029.36,
        "en_text": "dinosaur juice oh I can tell you what",
        "vi_text": "nước ép khủng long ồ tôi có thể nói cho bạn biết điều gì",
        "ipa": "/ˈdaɪnəˌsɔr ʤus oʊ aɪ kən tɛl ju wət/"
      },
      {
        "id": 289,
        "startTime": 1024.76,
        "endTime": 1032.44,
        "en_text": "was in it really how by smelling it",
        "vi_text": "nó thực sự như thế nào bằng cách ngửi nó",
        "ipa": "/wɑz ɪn ɪt ˈrɪli haʊ baɪ sˈmɛlɪŋ ɪt/"
      },
      {
        "id": 290,
        "startTime": 1029.36,
        "endTime": 1037.2,
        "en_text": "Freddy Fox has a very good sense of",
        "vi_text": "Freddy Fox có cảm giác rất tốt về",
        "ipa": "/ˈfrɛdi fɑks həz ə ˈvɛri gʊd sɛns əv/"
      },
      {
        "id": 291,
        "startTime": 1032.44,
        "endTime": 1041.56,
        "en_text": "smell H there's one banana one",
        "vi_text": "mùi H có một quả chuối một",
        "ipa": "/smɛl eɪʧ ðɛrz wən bəˈnænə wən/"
      },
      {
        "id": 292,
        "startTime": 1037.2,
        "endTime": 1045.4,
        "en_text": "banana three no four",
        "vi_text": "chuối ba không bốn",
        "ipa": "/bəˈnænə θri noʊ fɔr/"
      },
      {
        "id": 293,
        "startTime": 1041.56,
        "endTime": 1049.8,
        "en_text": "strawberries five cherries strawberries",
        "vi_text": "dâu tây năm quả anh đào dâu tây",
        "ipa": "/ˈstrɔˌbɛriz faɪv ˈʧɛriz ˈstrɔˌbɛriz/"
      },
      {
        "id": 294,
        "startTime": 1045.4,
        "endTime": 1051.08,
        "en_text": "cherries one peach half a pinea Apple a",
        "vi_text": "quả anh đào một quả đào nửa quả thông Táo a",
        "ipa": "/ˈʧɛriz wən piʧ hæf ə pinea* ˈæpəl ə/"
      },
      {
        "id": 295,
        "startTime": 1049.8,
        "endTime": 1055.4,
        "en_text": "slice of",
        "vi_text": "lát của",
        "ipa": "/slaɪs əv/"
      },
      {
        "id": 296,
        "startTime": 1051.08,
        "endTime": 1058.09,
        "en_text": "melon and something else what is it a",
        "vi_text": "dưa và cái gì khác nó là gì",
        "ipa": "/ˈmɛlən ənd ˈsəmθɪŋ ɛls wət ɪz ɪt ə/"
      },
      {
        "id": 297,
        "startTime": 1055.4,
        "endTime": 1058.67,
        "en_text": "carrot yes a",
        "vi_text": "cà rốt vâng a",
        "ipa": "/ˈkɛrət jɛs ə/"
      },
      {
        "id": 298,
        "startTime": 1058.09,
        "endTime": 1060.48,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 299,
        "startTime": 1058.67,
        "endTime": 1064.96,
        "en_text": "[Applause]",
        "vi_text": "[Vỗ tay]",
        "ipa": "/[əˈplɔz]/"
      },
      {
        "id": 300,
        "startTime": 1060.48,
        "endTime": 1064.96,
        "en_text": "carrot dinosaur juice for",
        "vi_text": "nước ép khủng long cà rốt cho",
        "ipa": "/ˈkɛrət ˈdaɪnəˌsɔr ʤus fər/"
      },
      {
        "id": 301,
        "startTime": 1067.28,
        "endTime": 1075.6,
        "en_text": "everyone are you all enjoying fruit day",
        "vi_text": "mọi người đều đang tận hưởng ngày trái cây",
        "ipa": "/ˈɛvriˌwən ər ju ɔl ˌɛnˈʤɔɪɪŋ frut deɪ/"
      },
      {
        "id": 302,
        "startTime": 1071.68,
        "endTime": 1078.84,
        "en_text": "yes we love fruit and",
        "vi_text": "vâng chúng tôi yêu trái cây và",
        "ipa": "/jɛs wi ləv frut ənd/"
      },
      {
        "id": 303,
        "startTime": 1075.6,
        "endTime": 1081.84,
        "en_text": "carrots everyone loves fruit and carot",
        "vi_text": "cà rốt mọi người đều thích trái cây và cà rốt",
        "ipa": "/ˈkɛrəts ˈɛvriˌwən ləvz frut ənd carot*/"
      },
      {
        "id": 304,
        "startTime": 1078.84,
        "endTime": 1081.84,
        "en_text": "carrots",
        "vi_text": "cà rốt",
        "ipa": "/ˈkɛrəts/"
      }
    ]
  },
  {
    "id": "ep_5",
    "title": "Tập 5 (Auto Generated)",
    "youtubeId": "DSF8ynO-L2E",
    "subtitles": [
      {
        "id": 1,
        "startTime": 0.92,
        "endTime": 6.36,
        "en_text": "the noisy night",
        "vi_text": "đêm ồn ào",
        "ipa": "/ðə ˈnɔɪzi naɪt/"
      },
      {
        "id": 2,
        "startTime": 3.5,
        "endTime": 8.04,
        "en_text": "Peppa's family are having a sleepover at",
        "vi_text": "Gia đình Peppa đang ngủ qua đêm tại",
        "ipa": "/peppa's* ˈfæməli ər ˈhævɪŋ ə sˈliˌpoʊvər æt/"
      },
      {
        "id": 3,
        "startTime": 6.36,
        "endTime": 11.28,
        "en_text": "cousin Chloe's house",
        "vi_text": "nhà của chị họ Chloe",
        "ipa": "/ˈkəzən kloʊiz haʊs/"
      },
      {
        "id": 4,
        "startTime": 8.04,
        "endTime": 14.7,
        "en_text": "hello everyone hello you must be tired",
        "vi_text": "xin chào mọi người xin chào các bạn chắc hẳn đã mệt rồi",
        "ipa": "/hɛˈloʊ ˈɛvriˌwən hɛˈloʊ ju məst bi taɪərd/"
      },
      {
        "id": 5,
        "startTime": 11.28,
        "endTime": 16.86,
        "en_text": "after your long journey yes an early",
        "vi_text": "sau cuộc hành trình dài của bạn vâng, sớm thôi",
        "ipa": "/ˈæftər jʊr lɔŋ ˈʤərni jɛs ən ˈərli/"
      },
      {
        "id": 6,
        "startTime": 14.7,
        "endTime": 21.38,
        "en_text": "night would be nice",
        "vi_text": "đêm sẽ tuyệt vời",
        "ipa": "/naɪt wʊd bi nis/"
      },
      {
        "id": 7,
        "startTime": 16.86,
        "endTime": 21.38,
        "en_text": "first we'll put Baby Alexander to bed",
        "vi_text": "đầu tiên chúng ta sẽ đưa bé Alexander đi ngủ",
        "ipa": "/fərst wɪl pʊt ˈbeɪbi ˌælɪgˈzændər tɪ bɛd/"
      },
      {
        "id": 8,
        "startTime": 22.46,
        "endTime": 27.08,
        "en_text": "this is baby Alexander's bedroom",
        "vi_text": "đây là phòng ngủ của bé Alexander",
        "ipa": "/ðɪs ɪz ˈbeɪbi ˌælɪgˈzændərz ˈbɛˌdrum/"
      },
      {
        "id": 9,
        "startTime": 29.6,
        "endTime": 33.74,
        "en_text": "Alexander likes noise it sends him to",
        "vi_text": "Alexander thích tiếng ồn nó gửi anh ấy đến",
        "ipa": "/ˌælɪgˈzændər laɪks nɔɪz ɪt sɛndz ɪm tɪ/"
      },
      {
        "id": 10,
        "startTime": 32.7,
        "endTime": 37.56,
        "en_text": "sleep",
        "vi_text": "ngủ",
        "ipa": "/slip/"
      },
      {
        "id": 11,
        "startTime": 33.74,
        "endTime": 41.1,
        "en_text": "we like noise in this house we're a",
        "vi_text": "chúng tôi thích tiếng ồn trong ngôi nhà này, chúng tôi là một",
        "ipa": "/wi laɪk nɔɪz ɪn ðɪs haʊs wɪr ə/"
      },
      {
        "id": 12,
        "startTime": 37.56,
        "endTime": 43.52,
        "en_text": "noisy family Peppa George you're staying",
        "vi_text": "gia đình ồn ào Peppa George bạn đang ở",
        "ipa": "/ˈnɔɪzi ˈfæməli peppa* ʤɔrʤ jʊr steɪɪŋ/"
      },
      {
        "id": 13,
        "startTime": 41.1,
        "endTime": 45.5,
        "en_text": "in my room tonight",
        "vi_text": "trong phòng tôi tối nay",
        "ipa": "/ɪn maɪ rum təˈnaɪt/"
      },
      {
        "id": 14,
        "startTime": 43.52,
        "endTime": 47.76,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 15,
        "startTime": 45.5,
        "endTime": 49.86,
        "en_text": "Pepper and George are excited to be",
        "vi_text": "Pepper và George rất vui mừng được",
        "ipa": "/ˈpɛpər ənd ʤɔrʤ ər ɪkˈsaɪtɪd tɪ bi/"
      },
      {
        "id": 16,
        "startTime": 47.76,
        "endTime": 53.76,
        "en_text": "sleeping in cousin Chloe's bedroom",
        "vi_text": "ngủ trong phòng ngủ của chị họ Chloe",
        "ipa": "/sˈlipɪŋ ɪn ˈkəzən kloʊiz ˈbɛˌdrum/"
      },
      {
        "id": 17,
        "startTime": 49.86,
        "endTime": 57.66,
        "en_text": "good night good night good night good",
        "vi_text": "chúc ngủ ngon chúc ngủ ngon chúc ngủ ngon chúc ngủ ngon",
        "ipa": "/gʊd naɪt gʊd naɪt gʊd naɪt gʊd/"
      },
      {
        "id": 18,
        "startTime": 53.76,
        "endTime": 60.12,
        "en_text": "night good night night",
        "vi_text": "ngủ ngon chúc ngủ ngon",
        "ipa": "/naɪt gʊd naɪt naɪt/"
      },
      {
        "id": 19,
        "startTime": 57.66,
        "endTime": 63.12,
        "en_text": "everyone is tucked up in their beds",
        "vi_text": "mọi người đều đang nằm trên giường của mình",
        "ipa": "/ˈɛvriˌwən ɪz təkt əp ɪn ðɛr bɛdz/"
      },
      {
        "id": 20,
        "startTime": 60.12,
        "endTime": 63.12,
        "en_text": "asleep",
        "vi_text": "ngủ",
        "ipa": "/əsˈlip/"
      },
      {
        "id": 21,
        "startTime": 63.96,
        "endTime": 70.3,
        "en_text": "Baby Alexander is awake",
        "vi_text": "Bé Alexander đã thức giấc",
        "ipa": "/ˈbeɪbi ˌælɪgˈzændər ɪz əˈweɪk/"
      },
      {
        "id": 22,
        "startTime": 67.8,
        "endTime": 71.46,
        "en_text": "and George are awake",
        "vi_text": "và George đã thức",
        "ipa": "/ənd ʤɔrʤ ər əˈweɪk/"
      },
      {
        "id": 23,
        "startTime": 70.3,
        "endTime": 76.34,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 24,
        "startTime": 71.46,
        "endTime": 76.34,
        "en_text": "lights it's the vacuum cleaner",
        "vi_text": "đèn đó là máy hút bụi",
        "ipa": "/laɪts ɪts ðə ˈvækjum ˈklinər/"
      },
      {
        "id": 25,
        "startTime": 76.86,
        "endTime": 81.48,
        "en_text": "um why are you vacuuming at night we're",
        "vi_text": "ừm tại sao bạn lại hút bụi vào ban đêm?",
        "ipa": "/əm waɪ ər ju ˈvækjumɪŋ æt naɪt wɪr/"
      },
      {
        "id": 26,
        "startTime": 80.22,
        "endTime": 86.18,
        "en_text": "not this",
        "vi_text": "không phải cái này",
        "ipa": "/nɑt ðɪs/"
      },
      {
        "id": 27,
        "startTime": 81.48,
        "endTime": 86.18,
        "en_text": "are we what oh no",
        "vi_text": "chúng ta có sao không ồ không",
        "ipa": "/ər wi wət oʊ noʊ/"
      },
      {
        "id": 28,
        "startTime": 87.84,
        "endTime": 93.44,
        "en_text": "we found noises the best way to get Baby",
        "vi_text": "chúng tôi đã tìm thấy tiếng ồn là cách tốt nhất để có được Baby",
        "ipa": "/wi faʊnd ˈnɔɪzɪz ðə bɛst weɪ tɪ gɪt ˈbeɪbi/"
      },
      {
        "id": 29,
        "startTime": 90.48,
        "endTime": 97.82,
        "en_text": "Alexander back to sleep he likes noise",
        "vi_text": "Alexander quay lại giấc ngủ anh ấy thích tiếng ồn",
        "ipa": "/ˌælɪgˈzændər bæk tɪ slip hi laɪks nɔɪz/"
      },
      {
        "id": 30,
        "startTime": 93.44,
        "endTime": 97.82,
        "en_text": "we're a noisy family",
        "vi_text": "chúng tôi là một gia đình ồn ào",
        "ipa": "/wɪr ə ˈnɔɪzi ˈfæməli/"
      },
      {
        "id": 31,
        "startTime": 98.76,
        "endTime": 104.6,
        "en_text": "everyone is back in their beds",
        "vi_text": "mọi người đã trở lại giường của mình",
        "ipa": "/ˈɛvriˌwən ɪz bæk ɪn ðɛr bɛdz/"
      },
      {
        "id": 32,
        "startTime": 101.7,
        "endTime": 104.6,
        "en_text": "asleep",
        "vi_text": "ngủ",
        "ipa": "/əsˈlip/"
      },
      {
        "id": 33,
        "startTime": 105.24,
        "endTime": 108.27,
        "en_text": "Baby Alexander is awake",
        "vi_text": "Bé Alexander đã thức giấc",
        "ipa": "/ˈbeɪbi ˌælɪgˈzændər ɪz əˈweɪk/"
      },
      {
        "id": 34,
        "startTime": 107.43,
        "endTime": 116.78,
        "en_text": "[Applause]",
        "vi_text": "[Vỗ tay]",
        "ipa": "/[əˈplɔz]/"
      },
      {
        "id": 35,
        "startTime": 108.27,
        "endTime": 120.54,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 36,
        "startTime": 116.78,
        "endTime": 124.08,
        "en_text": "to get Alexander to sleep the more noise",
        "vi_text": "để khiến Alexander ngủ càng ồn ào hơn",
        "ipa": "/tɪ gɪt ˌælɪgˈzændər tɪ slip ðə mɔr nɔɪz/"
      },
      {
        "id": 37,
        "startTime": 120.54,
        "endTime": 127.98,
        "en_text": "the better is there another way that",
        "vi_text": "tốt hơn là có cách khác",
        "ipa": "/ðə ˈbɛtər ɪz ðɛr əˈnəðər weɪ ðət/"
      },
      {
        "id": 38,
        "startTime": 124.08,
        "endTime": 129.56,
        "en_text": "doesn't use noise we do find noise is",
        "vi_text": "không sử dụng tiếng ồn, chúng tôi thấy tiếng ồn là",
        "ipa": "/ˈdəzənt juz nɔɪz wi du faɪnd nɔɪz ɪz/"
      },
      {
        "id": 39,
        "startTime": 127.98,
        "endTime": 132.84,
        "en_text": "the best way",
        "vi_text": "cách tốt nhất",
        "ipa": "/ðə bɛst weɪ/"
      },
      {
        "id": 40,
        "startTime": 129.56,
        "endTime": 135.3,
        "en_text": "when George was a baby we used to put",
        "vi_text": "khi George còn nhỏ chúng tôi thường đặt",
        "ipa": "/wɪn ʤɔrʤ wɑz ə ˈbeɪbi wi juzd tɪ pʊt/"
      },
      {
        "id": 41,
        "startTime": 132.84,
        "endTime": 138.96,
        "en_text": "him in his pram and wheel him around the",
        "vi_text": "bé trong xe đẩy và đẩy bé đi vòng quanh",
        "ipa": "/ɪm ɪn hɪz pram* ənd wil ɪm əraʊnd ðə/"
      },
      {
        "id": 42,
        "startTime": 135.3,
        "endTime": 143.16,
        "en_text": "house and that always sent him to sleep",
        "vi_text": "ngôi nhà và điều đó luôn khiến anh ấy buồn ngủ",
        "ipa": "/haʊs ənd ðət ˈɔlˌweɪz sɛnt ɪm tɪ slip/"
      },
      {
        "id": 43,
        "startTime": 138.96,
        "endTime": 145.26,
        "en_text": "how strange no loud noises that's right",
        "vi_text": "thật kỳ lạ là không có tiếng động lớn đúng vậy",
        "ipa": "/haʊ streɪnʤ noʊ laʊd ˈnɔɪzɪz ðæts raɪt/"
      },
      {
        "id": 44,
        "startTime": 143.16,
        "endTime": 148.56,
        "en_text": "how many times around the house was it",
        "vi_text": "đã bao lần quanh nhà rồi",
        "ipa": "/haʊ ˈmɛni taɪmz əraʊnd ðə haʊs wɑz ɪt/"
      },
      {
        "id": 45,
        "startTime": 145.26,
        "endTime": 150.26,
        "en_text": "Mummy Pig three times 50 times",
        "vi_text": "Mẹ lợn ba lần 50 lần",
        "ipa": "/ˈməmi pɪg θri taɪmz 50 taɪmz/"
      },
      {
        "id": 46,
        "startTime": 148.56,
        "endTime": 153.3,
        "en_text": "huh",
        "vi_text": "hử",
        "ipa": "/hə/"
      },
      {
        "id": 47,
        "startTime": 150.26,
        "endTime": 155.04,
        "en_text": "daddy pig is pushing Baby Alexander",
        "vi_text": "lợn bố đang đẩy bé Alexander",
        "ipa": "/ˈdædi pɪg ɪz ˈpʊʃɪŋ ˈbeɪbi ˌælɪgˈzændər/"
      },
      {
        "id": 48,
        "startTime": 153.3,
        "endTime": 156.72,
        "en_text": "around the house",
        "vi_text": "xung quanh nhà",
        "ipa": "/əraʊnd ðə haʊs/"
      },
      {
        "id": 49,
        "startTime": 155.04,
        "endTime": 159.72,
        "en_text": "50 times",
        "vi_text": "50 lần",
        "ipa": "/50 taɪmz/"
      },
      {
        "id": 50,
        "startTime": 156.72,
        "endTime": 159.72,
        "en_text": "good",
        "vi_text": "Tốt",
        "ipa": "/gʊd/"
      },
      {
        "id": 51,
        "startTime": 159.9,
        "endTime": 166.98,
        "en_text": "Baby Alexander is asleep",
        "vi_text": "Bé Alexander đang ngủ",
        "ipa": "/ˈbeɪbi ˌælɪgˈzændər ɪz əsˈlip/"
      },
      {
        "id": 52,
        "startTime": 163.5,
        "endTime": 169.82,
        "en_text": "can you let me back in I'll just switch",
        "vi_text": "bạn có thể cho tôi quay lại không, tôi sẽ chuyển đổi",
        "ipa": "/kən ju lɛt mi bæk ɪn aɪl ʤɪst swɪʧ/"
      },
      {
        "id": 53,
        "startTime": 166.98,
        "endTime": 169.82,
        "en_text": "armor",
        "vi_text": "áo giáp",
        "ipa": "/ˈɑrmər/"
      },
      {
        "id": 54,
        "startTime": 171.6,
        "endTime": 175.58,
        "en_text": "switch the alarm back on",
        "vi_text": "bật lại báo thức",
        "ipa": "/swɪʧ ðə əˈlɑrm bæk ɔn/"
      },
      {
        "id": 55,
        "startTime": 176.04,
        "endTime": 183.72,
        "en_text": "Peppa what are you doing up I can't",
        "vi_text": "Peppa bạn đang làm gì vậy, tôi không thể",
        "ipa": "/peppa* wət ər ju duɪŋ əp aɪ kænt/"
      },
      {
        "id": 56,
        "startTime": 179.22,
        "endTime": 188.36,
        "en_text": "sleep Daddy it's a noisy night okay",
        "vi_text": "ngủ đi bố ơi, đêm ồn ào quá đấy",
        "ipa": "/slip ˈdædi ɪts ə ˈnɔɪzi naɪt ˌoʊˈkeɪ/"
      },
      {
        "id": 57,
        "startTime": 183.72,
        "endTime": 188.36,
        "en_text": "Peppa let's get you back to bed",
        "vi_text": "Peppa hãy đưa bạn trở lại giường",
        "ipa": "/peppa* lɛts gɪt ju bæk tɪ bɛd/"
      },
      {
        "id": 58,
        "startTime": 188.64,
        "endTime": 194.28,
        "en_text": "now which bedroom are you staying in",
        "vi_text": "bây giờ bạn đang ở phòng ngủ nào",
        "ipa": "/naʊ wɪʧ ˈbɛˌdrum ər ju steɪɪŋ ɪn/"
      },
      {
        "id": 59,
        "startTime": 191.82,
        "endTime": 196.7,
        "en_text": "stop Daddy",
        "vi_text": "dừng lại đi bố",
        "ipa": "/stɑp ˈdædi/"
      },
      {
        "id": 60,
        "startTime": 194.28,
        "endTime": 196.7,
        "en_text": "baby",
        "vi_text": "Đứa bé",
        "ipa": "/ˈbeɪbi/"
      },
      {
        "id": 61,
        "startTime": 198.42,
        "endTime": 204.0,
        "en_text": "light has woken Baby Alexander it's all",
        "vi_text": "ánh sáng đã đánh thức Baby Alexander, thế thôi",
        "ipa": "/laɪt həz ˈwoʊkən ˈbeɪbi ˌælɪgˈzændər ɪts ɔl/"
      },
      {
        "id": 62,
        "startTime": 201.48,
        "endTime": 207.42,
        "en_text": "right I've got the vacuum cleaner I've",
        "vi_text": "đúng rồi tôi có máy hút bụi",
        "ipa": "/raɪt aɪv gɑt ðə ˈvækjum ˈklinər aɪv/"
      },
      {
        "id": 63,
        "startTime": 204.0,
        "endTime": 210.0,
        "en_text": "got the trumpets stop stop I remember",
        "vi_text": "tiếng kèn dừng lại tôi nhớ rồi",
        "ipa": "/gɑt ðə ˈtrəmpəts stɑp stɑp aɪ rɪˈmɛmbər/"
      },
      {
        "id": 64,
        "startTime": 207.42,
        "endTime": 214.02,
        "en_text": "another quiet way we used to get George",
        "vi_text": "một cách lặng lẽ khác mà chúng tôi thường dùng để có được George",
        "ipa": "/əˈnəðər kwaɪət weɪ wi juzd tɪ gɪt ʤɔrʤ/"
      },
      {
        "id": 65,
        "startTime": 210.0,
        "endTime": 217.5,
        "en_text": "to sleep oh yes we drove him around in",
        "vi_text": "để ngủ, ồ vâng, chúng tôi đã chở anh ấy đi vòng quanh",
        "ipa": "/tɪ slip oʊ jɛs wi droʊv ɪm əraʊnd ɪn/"
      },
      {
        "id": 66,
        "startTime": 214.02,
        "endTime": 219.62,
        "en_text": "the car I'll get the car started don't",
        "vi_text": "chiếc xe tôi sẽ khởi động chiếc xe không",
        "ipa": "/ðə kɑr aɪl gɪt ðə kɑr ˈstɑrtɪd doʊnt/"
      },
      {
        "id": 67,
        "startTime": 217.5,
        "endTime": 219.62,
        "en_text": "forget",
        "vi_text": "quên",
        "ipa": "/fərˈgɛt/"
      },
      {
        "id": 68,
        "startTime": 221.24,
        "endTime": 228.0,
        "en_text": "Daddy Pig has set off the noisy house",
        "vi_text": "Daddy Pig đã rời khỏi ngôi nhà ồn ào",
        "ipa": "/ˈdædi pɪg həz sɛt ɔf ðə ˈnɔɪzi haʊs/"
      },
      {
        "id": 69,
        "startTime": 224.64,
        "endTime": 230.07,
        "en_text": "alarm the noisy house has woken everyone",
        "vi_text": "báo động ngôi nhà ồn ào đã đánh thức mọi người",
        "ipa": "/əˈlɑrm ðə ˈnɔɪzi haʊs həz ˈwoʊkən ˈɛvriˌwən/"
      },
      {
        "id": 70,
        "startTime": 228.0,
        "endTime": 231.9,
        "en_text": "up",
        "vi_text": "hướng lên",
        "ipa": "/əp/"
      },
      {
        "id": 71,
        "startTime": 230.07,
        "endTime": 234.12,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 72,
        "startTime": 231.9,
        "endTime": 238.34,
        "en_text": "it's Miss Rabbit in her rescue",
        "vi_text": "đó là cô Rabbit đang được giải cứu",
        "ipa": "/ɪts mɪs ˈræbɪt ɪn hər ˈrɛskju/"
      },
      {
        "id": 73,
        "startTime": 234.12,
        "endTime": 238.34,
        "en_text": "helicopter is everybody",
        "vi_text": "trực thăng là tất cả mọi người",
        "ipa": "/ˈhɛlɪˌkɑptər ɪz ˈɛvriˌbɑdi/"
      },
      {
        "id": 74,
        "startTime": 240.5,
        "endTime": 246.66,
        "en_text": "yes thank you all right",
        "vi_text": "vâng cảm ơn bạn được rồi",
        "ipa": "/jɛs θæŋk ju ɔl raɪt/"
      },
      {
        "id": 75,
        "startTime": 243.66,
        "endTime": 246.66,
        "en_text": "cheerio",
        "vi_text": "cổ vũ",
        "ipa": "/ˈʧɪrioʊ/"
      },
      {
        "id": 76,
        "startTime": 248.84,
        "endTime": 258.48,
        "en_text": "oh that loud noise I said Baby Alexander",
        "vi_text": "ôi tiếng động lớn đó tôi đã nói Baby Alexander",
        "ipa": "/oʊ ðət laʊd nɔɪz aɪ sɛd ˈbeɪbi ˌælɪgˈzændər/"
      },
      {
        "id": 77,
        "startTime": 254.34,
        "endTime": 262.44,
        "en_text": "to sleep he's really fast asleep now oh",
        "vi_text": "đi ngủ bây giờ anh ấy đang ngủ rất say rồi ồ",
        "ipa": "/tɪ slip hiz ˈrɪli fæst əsˈlip naʊ oʊ/"
      },
      {
        "id": 78,
        "startTime": 258.48,
        "endTime": 267.5,
        "en_text": "thanks to my noisy daddy well done Daddy",
        "vi_text": "cảm ơn người bố ồn ào của con, bố làm tốt lắm",
        "ipa": "/θæŋks tɪ maɪ ˈnɔɪzi ˈdædi wɛl dən ˈdædi/"
      },
      {
        "id": 79,
        "startTime": 262.44,
        "endTime": 267.5,
        "en_text": "Pig we should have you to say more often",
        "vi_text": "Heo chúng ta nên để bạn nói thường xuyên hơn",
        "ipa": "/pɪg wi ʃʊd hæv ju tɪ seɪ mɔr ˈɔfən/"
      }
    ]
  },
  {
    "id": "ep_6",
    "title": "Tập 6 (Auto Generated)",
    "youtubeId": "tr2dfZhrO7U",
    "subtitles": [
      {
        "id": 1,
        "startTime": 0.8,
        "endTime": 5.2,
        "en_text": "the petting farm",
        "vi_text": "trang trại nuôi thú cưng",
        "ipa": "/ðə ˈpɛtɪŋ fɑrm/"
      },
      {
        "id": 2,
        "startTime": 2.72,
        "endTime": 7.28,
        "en_text": "mummy and daddy pig are taking peppa",
        "vi_text": "lợn bố và mẹ đang uống peppa",
        "ipa": "/ˈməmi ənd ˈdædi pɪg ər ˈteɪkɪŋ peppa*/"
      },
      {
        "id": 3,
        "startTime": 5.2,
        "endTime": 10.32,
        "en_text": "george and rebecca rabbit to visit a",
        "vi_text": "thỏ george và rebecca đến thăm",
        "ipa": "/ʤɔrʤ ənd rəˈbɛkə ˈræbɪt tɪ ˈvɪzɪt ə/"
      },
      {
        "id": 4,
        "startTime": 7.28,
        "endTime": 13.28,
        "en_text": "petting farm mummy what is a petting",
        "vi_text": "trang trại nuôi thú cưng, mẹ ơi, vuốt ve là gì",
        "ipa": "/ˈpɛtɪŋ fɑrm ˈməmi wət ɪz ə ˈpɛtɪŋ/"
      },
      {
        "id": 5,
        "startTime": 10.32,
        "endTime": 16.32,
        "en_text": "farm it's a place where you get to meet",
        "vi_text": "trang trại đó là nơi bạn gặp gỡ",
        "ipa": "/fɑrm ɪts ə pleɪs wɛr ju gɪt tɪ mit/"
      },
      {
        "id": 6,
        "startTime": 13.28,
        "endTime": 19.6,
        "en_text": "tiny little animals you can feed them",
        "vi_text": "những động vật nhỏ bé bạn có thể cho chúng ăn",
        "ipa": "/ˈtaɪni ˈlɪtəl ˈænəməlz ju kən fid ðɛm/"
      },
      {
        "id": 7,
        "startTime": 16.32,
        "endTime": 19.6,
        "en_text": "and you can stroke them",
        "vi_text": "và bạn có thể vuốt ve chúng",
        "ipa": "/ənd ju kən stroʊk ðɛm/"
      },
      {
        "id": 8,
        "startTime": 19.68,
        "endTime": 25.52,
        "en_text": "i love ickle little animals there's just",
        "vi_text": "tôi yêu những con vật nhỏ bé ickle chỉ là có",
        "ipa": "/aɪ ləv ickle* ˈlɪtəl ˈænəməlz ðɛrz ʤɪst/"
      },
      {
        "id": 9,
        "startTime": 23.04,
        "endTime": 28.24,
        "en_text": "one important rule of the farm",
        "vi_text": "một quy tắc quan trọng của trang trại",
        "ipa": "/wən ˌɪmˈpɔrtənt rul əv ðə fɑrm/"
      },
      {
        "id": 10,
        "startTime": 25.52,
        "endTime": 33.44,
        "en_text": "before and after meeting the animals we",
        "vi_text": "trước và sau khi gặp các loài động vật chúng ta",
        "ipa": "/ˌbiˈfɔr ənd ˈæftər ˈmitɪŋ ðə ˈænəməlz wi/"
      },
      {
        "id": 11,
        "startTime": 28.24,
        "endTime": 33.44,
        "en_text": "have to wash our hands yes daddy pig",
        "vi_text": "phải rửa tay vâng bố lợn",
        "ipa": "/hæv tɪ wɑʃ ɑr hænz jɛs ˈdædi pɪg/"
      },
      {
        "id": 12,
        "startTime": 33.6,
        "endTime": 39.44,
        "en_text": "this is the petting farm",
        "vi_text": "đây là trang trại nuôi thú cưng",
        "ipa": "/ðɪs ɪz ðə ˈpɛtɪŋ fɑrm/"
      },
      {
        "id": 13,
        "startTime": 35.76,
        "endTime": 41.44,
        "en_text": "hello there my lovelies i'm mrs badger",
        "vi_text": "xin chào các tình yêu của tôi tôi là bà lửng",
        "ipa": "/hɛˈloʊ ðɛr maɪ lovelies* əm ˈmɪsɪz ˈbæʤər/"
      },
      {
        "id": 14,
        "startTime": 39.44,
        "endTime": 44.16,
        "en_text": "the farmer hello",
        "vi_text": "người nông dân xin chào",
        "ipa": "/ðə ˈfɑrmər hɛˈloʊ/"
      },
      {
        "id": 15,
        "startTime": 41.44,
        "endTime": 48.08,
        "en_text": "now before we meet the animals there's",
        "vi_text": "bây giờ trước khi chúng ta gặp các loài động vật có",
        "ipa": "/naʊ ˌbiˈfɔr wi mit ðə ˈænəməlz ðɛrz/"
      },
      {
        "id": 16,
        "startTime": 44.16,
        "endTime": 51.92,
        "en_text": "one thing we have to do we have to wash",
        "vi_text": "một việc chúng ta phải làm là chúng ta phải rửa",
        "ipa": "/wən θɪŋ wi hæv tɪ du wi hæv tɪ wɑʃ/"
      },
      {
        "id": 17,
        "startTime": 48.08,
        "endTime": 54.43,
        "en_text": "our hands that's right",
        "vi_text": "tay của chúng tôi đúng rồi",
        "ipa": "/ɑr hænz ðæts raɪt/"
      },
      {
        "id": 18,
        "startTime": 51.92,
        "endTime": 55.68,
        "en_text": "first we use some soap",
        "vi_text": "đầu tiên chúng ta sử dụng một ít xà phòng",
        "ipa": "/fərst wi juz səm soʊp/"
      },
      {
        "id": 19,
        "startTime": 54.43,
        "endTime": 60.4,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 20,
        "startTime": 55.68,
        "endTime": 62.08,
        "en_text": "it's all bubbling i love bubbles and now",
        "vi_text": "tất cả đều sủi bọt tôi yêu bong bóng và bây giờ",
        "ipa": "/ɪts ɔl ˈbəbəlɪŋ aɪ ləv ˈbəbəlz ənd naʊ/"
      },
      {
        "id": 21,
        "startTime": 60.4,
        "endTime": 65.2,
        "en_text": "some water",
        "vi_text": "một ít nước",
        "ipa": "/səm ˈwɔtər/"
      },
      {
        "id": 22,
        "startTime": 62.08,
        "endTime": 66.4,
        "en_text": "wash wash wash our hands wash them nice",
        "vi_text": "rửa rửa rửa tay chúng ta rửa sạch nhé",
        "ipa": "/wɑʃ wɑʃ wɑʃ ɑr hænz wɑʃ ðɛm nis/"
      },
      {
        "id": 23,
        "startTime": 65.2,
        "endTime": 69.04,
        "en_text": "and clean",
        "vi_text": "và sạch sẽ",
        "ipa": "/ənd klin/"
      },
      {
        "id": 24,
        "startTime": 66.4,
        "endTime": 72.4,
        "en_text": "bubbly scrabbly scrabbly bubbly wash",
        "vi_text": "rửa bọt sủi bọt",
        "ipa": "/ˈbəbəli scrabbly* scrabbly* ˈbəbəli wɑʃ/"
      },
      {
        "id": 25,
        "startTime": 69.04,
        "endTime": 74.8,
        "en_text": "them nice and clean",
        "vi_text": "chúng đẹp và sạch sẽ",
        "ipa": "/ðɛm nis ənd klin/"
      },
      {
        "id": 26,
        "startTime": 72.4,
        "endTime": 79.04,
        "en_text": "what kind of animals have you got here",
        "vi_text": "bạn có loại động vật nào ở đây",
        "ipa": "/wət kaɪnd əv ˈænəməlz hæv ju gɑt hir/"
      },
      {
        "id": 27,
        "startTime": 74.8,
        "endTime": 81.2,
        "en_text": "mrs badger we've got chickens",
        "vi_text": "bà lửng chúng tôi có gà",
        "ipa": "/ˈmɪsɪz ˈbæʤər wiv gɑt ˈʧɪkənz/"
      },
      {
        "id": 28,
        "startTime": 79.04,
        "endTime": 83.92,
        "en_text": "here are the chickens",
        "vi_text": "đây là những con gà",
        "ipa": "/hir ər ðə ˈʧɪkənz/"
      },
      {
        "id": 29,
        "startTime": 81.2,
        "endTime": 87.92,
        "en_text": "it's time for the chicken's lunch would",
        "vi_text": "đã đến giờ ăn trưa của gà rồi",
        "ipa": "/ɪts taɪm fər ðə ˈʧɪkənz lənʧ wʊd/"
      },
      {
        "id": 30,
        "startTime": 83.92,
        "endTime": 91.68,
        "en_text": "you like to feed them yes please okay",
        "vi_text": "bạn thích cho chúng ăn vâng làm ơn nhé",
        "ipa": "/ju laɪk tɪ fid ðɛm jɛs pliz ˌoʊˈkeɪ/"
      },
      {
        "id": 31,
        "startTime": 87.92,
        "endTime": 92.96,
        "en_text": "have a bag of birdseed each",
        "vi_text": "Mỗi người có một túi hạt chim",
        "ipa": "/hæv ə bæg əv ˈbərdˌsid iʧ/"
      },
      {
        "id": 32,
        "startTime": 91.68,
        "endTime": 96.32,
        "en_text": "here",
        "vi_text": "đây",
        "ipa": "/hir/"
      },
      {
        "id": 33,
        "startTime": 92.96,
        "endTime": 96.32,
        "en_text": "come and eat some seeds",
        "vi_text": "đến và ăn một số hạt",
        "ipa": "/kəm ənd it səm sidz/"
      },
      {
        "id": 34,
        "startTime": 98.48,
        "endTime": 104.08,
        "en_text": "what lucky chickens yes they certainly",
        "vi_text": "những con gà thật may mắn đúng vậy, chúng chắc chắn rồi",
        "ipa": "/wət ˈləki ˈʧɪkənz jɛs ðeɪ ˈsərtənli/"
      },
      {
        "id": 35,
        "startTime": 101.44,
        "endTime": 108.48,
        "en_text": "are well-fed",
        "vi_text": "được ăn uống đầy đủ",
        "ipa": "/ər well-fed*/"
      },
      {
        "id": 36,
        "startTime": 104.08,
        "endTime": 110.96,
        "en_text": "no who wants to hold a baby chick me me",
        "vi_text": "không có ai muốn ôm một chú gà con với tôi không",
        "ipa": "/noʊ hu wɔnts tɪ hoʊld ə ˈbeɪbi ʧɪk mi mi/"
      },
      {
        "id": 37,
        "startTime": 108.48,
        "endTime": 110.96,
        "en_text": "lily me",
        "vi_text": "hoa huệ cho tôi",
        "ipa": "/ˈlɪli mi/"
      },
      {
        "id": 38,
        "startTime": 111.6,
        "endTime": 117.84,
        "en_text": "they're so little they're so fluffy",
        "vi_text": "chúng rất nhỏ và rất mềm mại",
        "ipa": "/ðɛr soʊ ˈlɪtəl ðɛr soʊ ˈfləfi/"
      },
      {
        "id": 39,
        "startTime": 115.44,
        "endTime": 121.12,
        "en_text": "they're so sweet",
        "vi_text": "họ thật ngọt ngào",
        "ipa": "/ðɛr soʊ swit/"
      },
      {
        "id": 40,
        "startTime": 117.84,
        "endTime": 125.36,
        "en_text": "it's true baby chicks are little and",
        "vi_text": "đúng là gà con còn nhỏ và",
        "ipa": "/ɪts tru ˈbeɪbi ʧɪks ər ˈlɪtəl ənd/"
      },
      {
        "id": 41,
        "startTime": 121.12,
        "endTime": 127.92,
        "en_text": "fluffy and sweet mrs badger what other",
        "vi_text": "bà lửng mềm mại và ngọt ngào còn gì nữa",
        "ipa": "/ˈfləfi ənd swit ˈmɪsɪz ˈbæʤər wət ˈəðər/"
      },
      {
        "id": 42,
        "startTime": 125.36,
        "endTime": 128.96,
        "en_text": "animals have you got we've got guinea",
        "vi_text": "bạn có động vật nào không, chúng tôi có chuột lang",
        "ipa": "/ˈænəməlz hæv ju gɑt wiv gɑt ˈgɪni/"
      },
      {
        "id": 43,
        "startTime": 127.92,
        "endTime": 132.8,
        "en_text": "pigs",
        "vi_text": "lợn",
        "ipa": "/pɪgz/"
      },
      {
        "id": 44,
        "startTime": 128.96,
        "endTime": 136.64,
        "en_text": "can we see the guinea pigs of course but",
        "vi_text": "tất nhiên chúng ta có thể nhìn thấy chuột lang không nhưng",
        "ipa": "/kən wi si ðə ˈgɪni pɪgz əv kɔrs bət/"
      },
      {
        "id": 45,
        "startTime": 132.8,
        "endTime": 140.4,
        "en_text": "before you see them you need to wash our",
        "vi_text": "trước khi nhìn thấy chúng bạn cần phải rửa sạch",
        "ipa": "/ˌbiˈfɔr ju si ðɛm ju nid tɪ wɑʃ ɑr/"
      },
      {
        "id": 46,
        "startTime": 136.64,
        "endTime": 143.44,
        "en_text": "hands that's right",
        "vi_text": "tay đúng rồi",
        "ipa": "/hænz ðæts raɪt/"
      },
      {
        "id": 47,
        "startTime": 140.4,
        "endTime": 144.72,
        "en_text": "wash wash wash your hands wash them nice",
        "vi_text": "rửa rửa rửa tay rửa sạch nhé",
        "ipa": "/wɑʃ wɑʃ wɑʃ jʊr hænz wɑʃ ðɛm nis/"
      },
      {
        "id": 48,
        "startTime": 143.44,
        "endTime": 146.96,
        "en_text": "and clean",
        "vi_text": "và sạch sẽ",
        "ipa": "/ənd klin/"
      },
      {
        "id": 49,
        "startTime": 144.72,
        "endTime": 150.4,
        "en_text": "bubbly scrabbles",
        "vi_text": "trò chơi nguệch ngoạc sôi nổi",
        "ipa": "/ˈbəbəli scrabbles*/"
      },
      {
        "id": 50,
        "startTime": 146.96,
        "endTime": 150.4,
        "en_text": "wash them nice and clean",
        "vi_text": "rửa chúng thật đẹp và sạch sẽ",
        "ipa": "/wɑʃ ðɛm nis ənd klin/"
      },
      {
        "id": 51,
        "startTime": 150.72,
        "endTime": 156.72,
        "en_text": "here are the guinea pigs",
        "vi_text": "đây là những con chuột lang",
        "ipa": "/hir ər ðə ˈgɪni pɪgz/"
      },
      {
        "id": 52,
        "startTime": 153.84,
        "endTime": 159.92,
        "en_text": "look at their cute little faces",
        "vi_text": "nhìn khuôn mặt nhỏ nhắn dễ thương của họ",
        "ipa": "/lʊk æt ðɛr kjut ˈlɪtəl ˈfeɪsɪz/"
      },
      {
        "id": 53,
        "startTime": 156.72,
        "endTime": 162.16,
        "en_text": "and their floppy little bodies you can",
        "vi_text": "và cơ thể mềm mại nhỏ bé của chúng, bạn có thể",
        "ipa": "/ənd ðɛr ˈflɑpi ˈlɪtəl ˈbɑdiz ju kən/"
      },
      {
        "id": 54,
        "startTime": 159.92,
        "endTime": 163.28,
        "en_text": "pick them up and stroke them if you like",
        "vi_text": "nhặt chúng lên và vuốt ve chúng nếu bạn thích",
        "ipa": "/pɪk ðɛm əp ənd stroʊk ðɛm ɪf ju laɪk/"
      },
      {
        "id": 55,
        "startTime": 162.16,
        "endTime": 167.28,
        "en_text": "oh",
        "vi_text": "Ồ",
        "ipa": "/oʊ/"
      },
      {
        "id": 56,
        "startTime": 163.28,
        "endTime": 170.24,
        "en_text": "you are lovely adorable aren't they",
        "vi_text": "bạn thật đáng yêu, đáng yêu phải không",
        "ipa": "/ju ər ˈləvli əˈdɔrəbəl ˈɑrənt ðeɪ/"
      },
      {
        "id": 57,
        "startTime": 167.28,
        "endTime": 173.6,
        "en_text": "that's not quite the word i would use",
        "vi_text": "đó không hẳn là từ tôi sẽ dùng",
        "ipa": "/ðæts nɑt kwaɪt ðə wərd aɪ wʊd juz/"
      },
      {
        "id": 58,
        "startTime": 170.24,
        "endTime": 177.04,
        "en_text": "and they make excellent pets can we have",
        "vi_text": "và họ là những con vật cưng tuyệt vời mà chúng ta có thể có",
        "ipa": "/ənd ðeɪ meɪk ˈɛksələnt pɛts kən wi hæv/"
      },
      {
        "id": 59,
        "startTime": 173.6,
        "endTime": 179.28,
        "en_text": "a guinea pig daddy please we haven't",
        "vi_text": "xin bố một con chuột lang, chúng con chưa có",
        "ipa": "/ə ˈgɪni pɪg ˈdædi pliz wi ˈhævənt/"
      },
      {
        "id": 60,
        "startTime": 177.04,
        "endTime": 182.72,
        "en_text": "really got the space to keep a guinea",
        "vi_text": "thực sự có không gian để giữ một con chuột lang",
        "ipa": "/ˈrɪli gɑt ðə speɪs tɪ kip ə ˈgɪni/"
      },
      {
        "id": 61,
        "startTime": 179.28,
        "endTime": 185.76,
        "en_text": "pig you don't need much space uh and",
        "vi_text": "lợn bạn không cần nhiều không gian à và",
        "ipa": "/pɪg ju doʊnt nid məʧ speɪs ə ənd/"
      },
      {
        "id": 62,
        "startTime": 182.72,
        "endTime": 188.08,
        "en_text": "they probably need lots of looking after",
        "vi_text": "có lẽ họ cần được chăm sóc nhiều",
        "ipa": "/ðeɪ ˈprɑbəˌbli nid lɑts əv ˈlʊkɪŋ ˈæftər/"
      },
      {
        "id": 63,
        "startTime": 185.76,
        "endTime": 191.52,
        "en_text": "oh guinea pigs are very easy to look",
        "vi_text": "ôi chuột lang dễ nhìn quá",
        "ipa": "/oʊ ˈgɪni pɪgz ər ˈvɛri ˈizi tɪ lʊk/"
      },
      {
        "id": 64,
        "startTime": 188.08,
        "endTime": 194.32,
        "en_text": "after and i would do all the work",
        "vi_text": "sau đó và tôi sẽ làm tất cả công việc",
        "ipa": "/ˈæftər ənd aɪ wʊd du ɔl ðə wərk/"
      },
      {
        "id": 65,
        "startTime": 191.52,
        "endTime": 196.72,
        "en_text": "but peppa um you might not want to do",
        "vi_text": "nhưng peppa ừm có thể bạn không muốn làm",
        "ipa": "/bət peppa* əm ju maɪt nɑt wɔnt tɪ du/"
      },
      {
        "id": 66,
        "startTime": 194.32,
        "endTime": 198.88,
        "en_text": "that forever and then you could always",
        "vi_text": "điều đó mãi mãi và sau đó bạn luôn có thể",
        "ipa": "/ðət fərˈɛvər ənd ðɛn ju kʊd ˈɔlˌweɪz/"
      },
      {
        "id": 67,
        "startTime": 196.72,
        "endTime": 201.36,
        "en_text": "look after it for her uh",
        "vi_text": "trông chừng nó cho cô ấy nhé",
        "ipa": "/lʊk ˈæftər ɪt fər hər ə/"
      },
      {
        "id": 68,
        "startTime": 198.88,
        "endTime": 204.48,
        "en_text": "look at the time i think we have to be",
        "vi_text": "hãy nhìn vào thời điểm tôi nghĩ chúng ta phải như vậy",
        "ipa": "/lʊk æt ðə taɪm aɪ θɪŋk wi hæv tɪ bi/"
      },
      {
        "id": 69,
        "startTime": 201.36,
        "endTime": 207.44,
        "en_text": "getting home oh yes look rebecca there's",
        "vi_text": "về nhà ồ vâng nhìn Rebecca kìa",
        "ipa": "/ˈgɪtɪŋ hoʊm oʊ jɛs lʊk rəˈbɛkə ðɛrz/"
      },
      {
        "id": 70,
        "startTime": 204.48,
        "endTime": 209.92,
        "en_text": "your mummy she's come to meet you here",
        "vi_text": "mẹ của bạn bà ấy đến gặp bạn ở đây",
        "ipa": "/jʊr ˈməmi ʃiz kəm tɪ mit ju hir/"
      },
      {
        "id": 71,
        "startTime": 207.44,
        "endTime": 212.88,
        "en_text": "is mummy rabbit with the baby twins",
        "vi_text": "là mẹ thỏ với cặp song sinh",
        "ipa": "/ɪz ˈməmi ˈræbɪt wɪθ ðə ˈbeɪbi twɪnz/"
      },
      {
        "id": 72,
        "startTime": 209.92,
        "endTime": 214.24,
        "en_text": "rosie and robbie hello rebecca hello",
        "vi_text": "Rosie và Robbie xin chào rebecca xin chào",
        "ipa": "/ˈroʊzi ənd ˈrɑbi hɛˈloʊ rəˈbɛkə hɛˈloʊ/"
      },
      {
        "id": 73,
        "startTime": 212.88,
        "endTime": 218.8,
        "en_text": "mommy",
        "vi_text": "mẹ ơi",
        "ipa": "/ˈmɑmi/"
      },
      {
        "id": 74,
        "startTime": 214.24,
        "endTime": 221.6,
        "en_text": "oh look cute little baby rabbits",
        "vi_text": "ôi nhìn những chú thỏ con dễ thương quá",
        "ipa": "/oʊ lʊk kjut ˈlɪtəl ˈbeɪbi ˈræbəts/"
      },
      {
        "id": 75,
        "startTime": 218.8,
        "endTime": 224.4,
        "en_text": "yes my little baby brother and sister",
        "vi_text": "vâng em trai và em gái bé nhỏ của tôi",
        "ipa": "/jɛs maɪ ˈlɪtəl ˈbeɪbi ˈbrəðər ənd ˈsɪstər/"
      },
      {
        "id": 76,
        "startTime": 221.6,
        "endTime": 227.04,
        "en_text": "really are cute can we cuddle them",
        "vi_text": "thật sự rất dễ thương, chúng ta có thể ôm chúng được không",
        "ipa": "/ˈrɪli ər kjut kən wi ˈkədəl ðɛm/"
      },
      {
        "id": 77,
        "startTime": 224.4,
        "endTime": 229.28,
        "en_text": "please mummy rabbit of course you can",
        "vi_text": "làm ơn mẹ thỏ tất nhiên là bạn có thể",
        "ipa": "/pliz ˈməmi ˈræbɪt əv kɔrs ju kən/"
      },
      {
        "id": 78,
        "startTime": 227.04,
        "endTime": 232.8,
        "en_text": "peppa but there's something you need to",
        "vi_text": "peppa nhưng có vài thứ bạn cần phải làm",
        "ipa": "/peppa* bət ðɛrz ˈsəmθɪŋ ju nid tɪ/"
      },
      {
        "id": 79,
        "startTime": 229.28,
        "endTime": 235.92,
        "en_text": "do first wash our hands",
        "vi_text": "trước tiên hãy rửa tay",
        "ipa": "/du fərst wɑʃ ɑr hænz/"
      },
      {
        "id": 80,
        "startTime": 232.8,
        "endTime": 239.08,
        "en_text": "wash wash wash your hands wash them nice",
        "vi_text": "rửa rửa rửa tay rửa sạch nhé",
        "ipa": "/wɑʃ wɑʃ wɑʃ jʊr hænz wɑʃ ðɛm nis/"
      },
      {
        "id": 81,
        "startTime": 235.92,
        "endTime": 239.08,
        "en_text": "and clean",
        "vi_text": "và sạch sẽ",
        "ipa": "/ənd klin/"
      },
      {
        "id": 82,
        "startTime": 248.16,
        "endTime": 254.08,
        "en_text": "have you had a nice time today yes mommy",
        "vi_text": "hôm nay mẹ vui vẻ phải không mẹ",
        "ipa": "/hæv ju hæd ə nis taɪm təˈdeɪ jɛs ˈmɑmi/"
      },
      {
        "id": 83,
        "startTime": 251.04,
        "endTime": 256.8,
        "en_text": "we fed seeds to chickens",
        "vi_text": "chúng tôi đã cho gà ăn hạt giống",
        "ipa": "/wi fɛd sidz tɪ ˈʧɪkənz/"
      },
      {
        "id": 84,
        "startTime": 254.08,
        "endTime": 259.68,
        "en_text": "we helped the baby chicks",
        "vi_text": "chúng tôi đã giúp đỡ những chú gà con",
        "ipa": "/wi hɛlpt ðə ˈbeɪbi ʧɪks/"
      },
      {
        "id": 85,
        "startTime": 256.8,
        "endTime": 262.96,
        "en_text": "we stroked the guinea pigs",
        "vi_text": "chúng tôi vuốt ve chuột lang",
        "ipa": "/wi stroʊkt ðə ˈgɪni pɪgz/"
      },
      {
        "id": 86,
        "startTime": 259.68,
        "endTime": 264.56,
        "en_text": "and now best of all we're cuddling baby",
        "vi_text": "và điều tuyệt vời nhất bây giờ là chúng ta đang âu yếm em yêu",
        "ipa": "/ənd naʊ bɛst əv ɔl wɪr ˈkədlɪŋ ˈbeɪbi/"
      },
      {
        "id": 87,
        "startTime": 262.96,
        "endTime": 266.96,
        "en_text": "rabbits",
        "vi_text": "thỏ",
        "ipa": "/ˈræbəts/"
      },
      {
        "id": 88,
        "startTime": 264.56,
        "endTime": 271.72,
        "en_text": "peppa loves the wedding fun",
        "vi_text": "peppa thích đám cưới vui vẻ",
        "ipa": "/peppa* ləvz ðə ˈwɛdɪŋ fən/"
      },
      {
        "id": 89,
        "startTime": 266.96,
        "endTime": 271.72,
        "en_text": "everyone loves the petting farm",
        "vi_text": "mọi người đều yêu thích trang trại nuôi thú cưng",
        "ipa": "/ˈɛvriˌwən ləvz ðə ˈpɛtɪŋ fɑrm/"
      }
    ]
  },
  {
    "id": "ep_7",
    "title": "Tập 7 (Auto Generated)",
    "youtubeId": "HEyqytq0-is",
    "subtitles": [
      {
        "id": 1,
        "startTime": 0.0,
        "endTime": 0.78,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 2,
        "startTime": 2.49,
        "endTime": 3.9,
        "en_text": "I'm CRISTA RONALDO.",
        "vi_text": "Tôi là CRISTA RONALDO.",
        "ipa": "/əm ˈkrɪstə ronaldo*./"
      },
      {
        "id": 3,
        "startTime": 4.72,
        "endTime": 6.39,
        "en_text": "This is my little brother George",
        "vi_text": "Đây là em trai George của tôi",
        "ipa": "/ðɪs ɪz maɪ ˈlɪtəl ˈbrəðər ʤɔrʤ/"
      },
      {
        "id": 4,
        "startTime": 6.39,
        "endTime": 7.03,
        "en_text": "BARK BARK",
        "vi_text": "VỎ VỎ",
        "ipa": "/bɑrk bɑrk/"
      },
      {
        "id": 5,
        "startTime": 7.4,
        "endTime": 8.84,
        "en_text": "This is Mummy Pig",
        "vi_text": "Đây là Mẹ Lợn",
        "ipa": "/ðɪs ɪz ˈməmi pɪg/"
      },
      {
        "id": 6,
        "startTime": 8.84,
        "endTime": 9.34,
        "en_text": "BARK",
        "vi_text": "VỎ",
        "ipa": "/bɑrk/"
      },
      {
        "id": 7,
        "startTime": 9.64,
        "endTime": 11.13,
        "en_text": "and this is Daddy Pig",
        "vi_text": "và đây là Bố Lợn",
        "ipa": "/ənd ðɪs ɪz ˈdædi pɪg/"
      },
      {
        "id": 8,
        "startTime": 11.13,
        "endTime": 12.64,
        "en_text": "*barking noises intensify*",
        "vi_text": "*tiếng sủa ngày càng lớn*",
        "ipa": "/*ˈbɑrkɪŋ ˈnɔɪzɪz ˌɪnˈtɛnsɪˌfaɪ*/"
      },
      {
        "id": 9,
        "startTime": 14.93,
        "endTime": 15.64,
        "en_text": "SEWEY!",
        "vi_text": "MAY!",
        "ipa": "/sewey*!/"
      },
      {
        "id": 10,
        "startTime": 23.29,
        "endTime": 23.8,
        "en_text": "Yo chat...",
        "vi_text": "Trò chuyện đi...",
        "ipa": "/joʊ ʧæt.../"
      },
      {
        "id": 11,
        "startTime": 23.8,
        "endTime": 25.52,
        "en_text": "why this game so fun chat?",
        "vi_text": "tại sao trò chơi này lại trò chuyện thú vị đến vậy?",
        "ipa": "/waɪ ðɪs geɪm soʊ fən ʧæt?/"
      },
      {
        "id": 12,
        "startTime": 26.76,
        "endTime": 27.59,
        "en_text": "Wassup Ben?",
        "vi_text": "Có phải Ben không?",
        "ipa": "/wassup* bɛn?/"
      },
      {
        "id": 13,
        "startTime": 28.31,
        "endTime": 29.62,
        "en_text": "I have a question for you all right...",
        "vi_text": "Được rồi tôi có một câu hỏi dành cho bạn...",
        "ipa": "/aɪ hæv ə kˈwɛʃən fər ju ɔl raɪt.../"
      },
      {
        "id": 14,
        "startTime": 29.62,
        "endTime": 31.03,
        "en_text": "*laughs*",
        "vi_text": "*cười*",
        "ipa": "/*læfs*/"
      },
      {
        "id": 15,
        "startTime": 31.51,
        "endTime": 32.59,
        "en_text": "Stop laughing all right...",
        "vi_text": "Đừng cười nữa được không...",
        "ipa": "/stɑp ˈlæfɪŋ ɔl raɪt.../"
      },
      {
        "id": 16,
        "startTime": 32.78,
        "endTime": 33.93,
        "en_text": "*laughs*",
        "vi_text": "*cười*",
        "ipa": "/*læfs*/"
      },
      {
        "id": 17,
        "startTime": 35.35,
        "endTime": 36.83,
        "en_text": "Are you serious right neow bro?",
        "vi_text": "Bạn có nghiêm túc không, anh bạn mới?",
        "ipa": "/ər ju ˈsɪriəs raɪt neow* broʊ?/"
      },
      {
        "id": 18,
        "startTime": 37.62,
        "endTime": 38.43,
        "en_text": "Ugh",
        "vi_text": "Ờ",
        "ipa": "/əg/"
      },
      {
        "id": 19,
        "startTime": 38.62,
        "endTime": 41.12,
        "en_text": "I just want to be friends, that's all I wanna be...",
        "vi_text": "Tôi chỉ muốn là bạn bè, đó là tất cả những gì tôi muốn...",
        "ipa": "/aɪ ʤɪst wɔnt tɪ bi frɛndz, ðæts ɔl aɪ ˈwɑnə bi.../"
      },
      {
        "id": 20,
        "startTime": 41.12,
        "endTime": 42.31,
        "en_text": "I wanna be friends",
        "vi_text": "Tôi muốn làm bạn",
        "ipa": "/aɪ ˈwɑnə bi frɛndz/"
      },
      {
        "id": 21,
        "startTime": 43.0,
        "endTime": 43.57,
        "en_text": "Yeeess",
        "vi_text": "Vâng",
        "ipa": "/yeeess*/"
      },
      {
        "id": 22,
        "startTime": 44.0,
        "endTime": 45.35,
        "en_text": "Okay, we friends now?",
        "vi_text": "Được rồi, bây giờ chúng ta là bạn bè nhé?",
        "ipa": "/ˌoʊˈkeɪ, wi frɛndz naʊ?/"
      },
      {
        "id": 23,
        "startTime": 45.85,
        "endTime": 46.45,
        "en_text": "No",
        "vi_text": "KHÔNG",
        "ipa": "/noʊ/"
      },
      {
        "id": 24,
        "startTime": 47.12,
        "endTime": 48.3,
        "en_text": "*mental breakdown*",
        "vi_text": "*suy sụp tinh thần*",
        "ipa": "/*ˈmɛntəl ˈbreɪkˌdaʊn*/"
      },
      {
        "id": 25,
        "startTime": 52.44,
        "endTime": 53.89,
        "en_text": "Ben's a b**** bro",
        "vi_text": "Ben là thằng khốn nạn",
        "ipa": "/bɛnz ə bi**** broʊ/"
      },
      {
        "id": 26,
        "startTime": 54.54,
        "endTime": 55.92,
        "en_text": "Hello Suzy...",
        "vi_text": "Xin chào Suzy...",
        "ipa": "/hɛˈloʊ ˈsuzi.../"
      },
      {
        "id": 27,
        "startTime": 55.92,
        "endTime": 56.79,
        "en_text": "Hello Speed",
        "vi_text": "Xin chào tốc độ",
        "ipa": "/hɛˈloʊ spid/"
      },
      {
        "id": 28,
        "startTime": 56.79,
        "endTime": 57.76,
        "en_text": "Hello Zoey",
        "vi_text": "Xin chào Zoey",
        "ipa": "/hɛˈloʊ zoey*/"
      },
      {
        "id": 29,
        "startTime": 58.81,
        "endTime": 60.06,
        "en_text": "Hello everyone!",
        "vi_text": "Xin chào tất cả mọi người!",
        "ipa": "/hɛˈloʊ ˈɛvriˌwən!/"
      },
      {
        "id": 30,
        "startTime": 60.27,
        "endTime": 61.18,
        "en_text": "BEN!",
        "vi_text": "BẾN!",
        "ipa": "/bɛn!/"
      },
      {
        "id": 31,
        "startTime": 62.61,
        "endTime": 63.16,
        "en_text": "NO!",
        "vi_text": "KHÔNG!",
        "ipa": "/noʊ!/"
      },
      {
        "id": 32,
        "startTime": 64.28,
        "endTime": 65.16,
        "en_text": "Is this you?",
        "vi_text": "Đây có phải là bạn không?",
        "ipa": "/ɪz ðɪs ju?/"
      },
      {
        "id": 33,
        "startTime": 66.21,
        "endTime": 66.77,
        "en_text": "No",
        "vi_text": "KHÔNG",
        "ipa": "/noʊ/"
      },
      {
        "id": 34,
        "startTime": 68.75,
        "endTime": 70.71,
        "en_text": "Let's talk about music.",
        "vi_text": "Hãy nói về âm nhạc.",
        "ipa": "/lɛts tɔk əˈbaʊt mˈjuzɪk./"
      },
      {
        "id": 35,
        "startTime": 70.95,
        "endTime": 73.09,
        "en_text": "What music are you into?",
        "vi_text": "Bạn yêu thích thể loại nhạc nào?",
        "ipa": "/wət mˈjuzɪk ər ju ˈɪntu?/"
      },
      {
        "id": 36,
        "startTime": 73.41,
        "endTime": 76.95,
        "en_text": "I like this... it's very grown up",
        "vi_text": "Tôi thích điều này... nó rất trưởng thành",
        "ipa": "/aɪ laɪk ðɪs... ɪts ˈvɛri groʊn əp/"
      },
      {
        "id": 37,
        "startTime": 77.43,
        "endTime": 78.63,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 38,
        "startTime": 84.18,
        "endTime": 85.33,
        "en_text": "Let me ask you a question all right?",
        "vi_text": "Hãy để tôi hỏi bạn một câu được không?",
        "ipa": "/lɛt mi æsk ju ə kˈwɛʃən ɔl raɪt?/"
      },
      {
        "id": 39,
        "startTime": 86.67,
        "endTime": 88.41,
        "en_text": "Who's better Ronaldo or Messi?",
        "vi_text": "Ronaldo hay Messi xuất sắc hơn?",
        "ipa": "/huz ˈbɛtər ronaldo* ər messi*?/"
      },
      {
        "id": 40,
        "startTime": 89.42,
        "endTime": 90.58,
        "en_text": "Meeeeeessi",
        "vi_text": "Meeeeeessi",
        "ipa": "/meeeeeessi*/"
      },
      {
        "id": 41,
        "startTime": 91.88,
        "endTime": 93.31,
        "en_text": "*dog noises intensify*",
        "vi_text": "*tiếng chó ngày càng lớn*",
        "ipa": "/*dɔg ˈnɔɪzɪz ˌɪnˈtɛnsɪˌfaɪ*/"
      },
      {
        "id": 42,
        "startTime": 99.41,
        "endTime": 102.82,
        "en_text": "NARRATOR: Speed and George are going to play FOOTBALL",
        "vi_text": "NGƯỜI DẪN: Speed ​​và George sẽ chơi BÓNG ĐÁ",
        "ipa": "/ˈnɛreɪtər: spid ənd ʤɔrʤ ər goʊɪŋ tɪ pleɪ ˈfʊtˌbɔl/"
      },
      {
        "id": 43,
        "startTime": 103.58,
        "endTime": 104.33,
        "en_text": "SEWEY!",
        "vi_text": "MAY!",
        "ipa": "/sewey*!/"
      },
      {
        "id": 44,
        "startTime": 106.77,
        "endTime": 108.13,
        "en_text": "CRISTA RONALDO!",
        "vi_text": "CRISTA RONALDO!",
        "ipa": "/ˈkrɪstə ronaldo*!/"
      },
      {
        "id": 45,
        "startTime": 108.13,
        "endTime": 108.79,
        "en_text": "SEWEY!",
        "vi_text": "MAY!",
        "ipa": "/sewey*!/"
      },
      {
        "id": 46,
        "startTime": 110.34,
        "endTime": 112.25,
        "en_text": "AAAAAAAAAHHHHHH...",
        "vi_text": "AAAAAAAAAHHHHHH...",
        "ipa": "/aaaaaaaaahhhhhh*.../"
      },
      {
        "id": 47,
        "startTime": 112.25,
        "endTime": 113.73,
        "en_text": "Ma head...",
        "vi_text": "Mẹ đầu...",
        "ipa": "/mɑ hɛd.../"
      },
      {
        "id": 48,
        "startTime": 116.92,
        "endTime": 118.74,
        "en_text": "NARRATOR: Here is Speed's best friend.",
        "vi_text": "NGƯỜI TƯỜNG THUẬT: Đây là bạn thân nhất của Speed.",
        "ipa": "/ˈnɛreɪtər: hir ɪz speed's* bɛst frɛnd./"
      },
      {
        "id": 49,
        "startTime": 118.74,
        "endTime": 119.68,
        "en_text": "Hello Speed",
        "vi_text": "Xin chào tốc độ",
        "ipa": "/hɛˈloʊ spid/"
      },
      {
        "id": 50,
        "startTime": 120.17,
        "endTime": 121.01,
        "en_text": "Hello Suzy",
        "vi_text": "Xin chào Suzy",
        "ipa": "/hɛˈloʊ ˈsuzi/"
      },
      {
        "id": 51,
        "startTime": 122.2,
        "endTime": 123.15,
        "en_text": "[Gangster Music]",
        "vi_text": "[Nhạc xã hội đen]",
        "ipa": "/[ˈgæŋstər mˈjuzɪk]/"
      },
      {
        "id": 52,
        "startTime": 127.86,
        "endTime": 128.57,
        "en_text": "Hello!",
        "vi_text": "Xin chào!",
        "ipa": "/hɛˈloʊ!/"
      },
      {
        "id": 53,
        "startTime": 129.42,
        "endTime": 130.85,
        "en_text": "Let's play football!",
        "vi_text": "Hãy chơi bóng đá!",
        "ipa": "/lɛts pleɪ ˈfʊtˌbɔl!/"
      },
      {
        "id": 54,
        "startTime": 131.33,
        "endTime": 133.13,
        "en_text": "Portugal versus Argentina",
        "vi_text": "Bồ Đào Nha đấu với Argentina",
        "ipa": "/ˈpɔrʧəgəl ˈvərsəz ˌɑrʤənˈtinə/"
      },
      {
        "id": 55,
        "startTime": 133.5,
        "endTime": 134.82,
        "en_text": "Ronaldo versus Messi",
        "vi_text": "Ronaldo đấu với Messi",
        "ipa": "/ronaldo* ˈvərsəz messi*/"
      },
      {
        "id": 56,
        "startTime": 137.09,
        "endTime": 138.1,
        "en_text": "We'll start!",
        "vi_text": "Chúng ta sẽ bắt đầu!",
        "ipa": "/wɪl stɑrt!/"
      },
      {
        "id": 57,
        "startTime": 143.75,
        "endTime": 144.25,
        "en_text": "SHUT UP!",
        "vi_text": "CÂM MIỆNG!",
        "ipa": "/ʃət əp!/"
      },
      {
        "id": 58,
        "startTime": 144.65,
        "endTime": 145.15,
        "en_text": "SHUT UP!",
        "vi_text": "CÂM MIỆNG!",
        "ipa": "/ʃət əp!/"
      },
      {
        "id": 59,
        "startTime": 146.1,
        "endTime": 147.84,
        "en_text": "COMMENTATOR: Messi, Messi, Messi, Messi...",
        "vi_text": "BÌNH LUẬN: Messi, Messi, Messi, Messi...",
        "ipa": "/ˈkɑmənˌteɪtər: messi*, messi*, messi*, messi*.../"
      },
      {
        "id": 60,
        "startTime": 149.1,
        "endTime": 150.29,
        "en_text": "COMMENTATOR: Encara Messi, encara Messi...",
        "vi_text": "BÌNH LUẬN: Encara Messi, encara Messi...",
        "ipa": "/ˈkɑmənˌteɪtər: encara* messi*, encara* messi*.../"
      },
      {
        "id": 61,
        "startTime": 150.29,
        "endTime": 152.55,
        "en_text": "encara Messi, encara Messi, encara Messi, encara Messi, ENCARA MESSI...",
        "vi_text": "đính kèm Messi, đính kèm Messi, đính kèm Messi, đính kèm Messi, đính kèm Messi, đính kèm Messi...",
        "ipa": "/encara* messi*, encara* messi*, encara* messi*, encara* messi*, encara* messi*.../"
      },
      {
        "id": 62,
        "startTime": 152.75,
        "endTime": 153.25,
        "en_text": "ENCARA MESSI",
        "vi_text": "ENCARA MESSI",
        "ipa": "/encara* messi*/"
      },
      {
        "id": 63,
        "startTime": 153.33,
        "endTime": 153.83,
        "en_text": "ENCARA MESSI",
        "vi_text": "ENCARA MESSI",
        "ipa": "/encara* messi*/"
      },
      {
        "id": 64,
        "startTime": 153.91,
        "endTime": 154.41,
        "en_text": "ENCARA MESSI",
        "vi_text": "ENCARA MESSI",
        "ipa": "/encara* messi*/"
      },
      {
        "id": 65,
        "startTime": 154.46,
        "endTime": 154.96,
        "en_text": "ENCARA MESSI",
        "vi_text": "ENCARA MESSI",
        "ipa": "/encara* messi*/"
      },
      {
        "id": 66,
        "startTime": 155.05,
        "endTime": 155.61,
        "en_text": "ENCARA MESSI",
        "vi_text": "ENCARA MESSI",
        "ipa": "/encara* messi*/"
      },
      {
        "id": 67,
        "startTime": 155.61,
        "endTime": 156.67,
        "en_text": "GOAL GOAL GOAL GOAL GOAL GOAL...",
        "vi_text": "MỤC TIÊU MỤC TIÊU MỤC TIÊU MỤC TIÊU...",
        "ipa": "/goʊl goʊl goʊl goʊl goʊl goʊl.../"
      },
      {
        "id": 68,
        "startTime": 156.84,
        "endTime": 157.75,
        "en_text": "GOAL GOAL GOAL GOAL GOAL GOAL...",
        "vi_text": "MỤC TIÊU MỤC TIÊU MỤC TIÊU MỤC TIÊU...",
        "ipa": "/goʊl goʊl goʊl goʊl goʊl goʊl.../"
      },
      {
        "id": 69,
        "startTime": 158.22,
        "endTime": 159.98,
        "en_text": "NARRATOR: Argentina has scored a goal.",
        "vi_text": "NGƯỜI DẪN: Argentina đã ghi được một bàn thắng.",
        "ipa": "/ˈnɛreɪtər: ˌɑrʤənˈtinə həz skɔrd ə goʊl./"
      },
      {
        "id": 70,
        "startTime": 160.08,
        "endTime": 161.57,
        "en_text": "NOOOOO BRO...",
        "vi_text": "KHÔNGOO anh bạn...",
        "ipa": "/nooooo* broʊ.../"
      },
      {
        "id": 71,
        "startTime": 161.87,
        "endTime": 163.3,
        "en_text": "The boys are winning!",
        "vi_text": "Các chàng trai đang chiến thắng!",
        "ipa": "/ðə bɔɪz ər ˈwɪnɪŋ!/"
      },
      {
        "id": 72,
        "startTime": 165.69,
        "endTime": 166.76,
        "en_text": "NARRATOR: It is half time.",
        "vi_text": "NGƯỜI DẪN: Bây giờ là một nửa thời gian.",
        "ipa": "/ˈnɛreɪtər: ɪt ɪz hæf taɪm./"
      },
      {
        "id": 73,
        "startTime": 169.81,
        "endTime": 170.63,
        "en_text": "*sighs*",
        "vi_text": "*thở dài*",
        "ipa": "/*saɪz*/"
      },
      {
        "id": 74,
        "startTime": 171.37,
        "endTime": 174.36,
        "en_text": "Oh! My dress is a bit muddy",
        "vi_text": "Ồ! Váy của tôi hơi bẩn",
        "ipa": "/oʊ! maɪ drɛs ɪz ə bɪt ˈmədi/"
      },
      {
        "id": 75,
        "startTime": 176.21,
        "endTime": 178.96,
        "en_text": "WHAT DA HELL!?",
        "vi_text": "CÁI GÌ ĐÓ!?",
        "ipa": "/wət ˈdiˈeɪ hɛl!?/"
      },
      {
        "id": 76,
        "startTime": 178.96,
        "endTime": 179.84,
        "en_text": "OH MA-",
        "vi_text": "ôi mẹ-",
        "ipa": "/oʊ mɑ-/"
      },
      {
        "id": 77,
        "startTime": 180.51,
        "endTime": 182.78,
        "en_text": "NARRATOR: Mummy Pig and George have found more things to wash.",
        "vi_text": "NGƯỜI DẪN THUẬT: Mẹ Lợn và George đã tìm được nhiều thứ hơn để giặt.",
        "ipa": "/ˈnɛreɪtər: ˈməmi pɪg ənd ʤɔrʤ hæv faʊnd mɔr θɪŋz tɪ wɑʃ./"
      },
      {
        "id": 78,
        "startTime": 182.78,
        "endTime": 183.51,
        "en_text": "SEWEY!",
        "vi_text": "MAY!",
        "ipa": "/sewey*!/"
      },
      {
        "id": 79,
        "startTime": 183.72,
        "endTime": 185.21,
        "en_text": "Very good George!",
        "vi_text": "Hay lắm George!",
        "ipa": "/ˈvɛri gʊd ʤɔrʤ!/"
      },
      {
        "id": 80,
        "startTime": 186.0,
        "endTime": 187.77,
        "en_text": "We put the clothes in here...",
        "vi_text": "Chúng ta để quần áo ở đây...",
        "ipa": "/wi pʊt ðə kloʊðz ɪn hir.../"
      },
      {
        "id": 81,
        "startTime": 193.04,
        "endTime": 194.16,
        "en_text": "AAAAAAAHHHHHHH!!!!",
        "vi_text": "AAAAAAAHHHHHH!!!!",
        "ipa": "/aaaaaaahhhhhhh*!!!!/"
      },
      {
        "id": 82,
        "startTime": 194.72,
        "endTime": 195.39,
        "en_text": "AAAAAAHHHHHH!!!!",
        "vi_text": "AAAAAAAHHHHHH!!!!",
        "ipa": "/aaaaaahhhhhh*!!!!/"
      },
      {
        "id": 83,
        "startTime": 195.39,
        "endTime": 198.47,
        "en_text": "NARRATOR: The washing machine is making the whole room shake!",
        "vi_text": "NGƯỜI DẪN: Chiếc máy giặt đang làm rung chuyển cả căn phòng!",
        "ipa": "/ˈnɛreɪtər: ðə ˈwɑʃɪŋ məˈʃin ɪz ˈmeɪkɪŋ ðə hoʊl rum ʃeɪk!/"
      },
      {
        "id": 84,
        "startTime": 198.47,
        "endTime": 199.32,
        "en_text": "AAAAAAHHHHH!!!",
        "vi_text": "AAAAAAHHHHH!!!",
        "ipa": "/aaaaaahhhhh*!!!/"
      },
      {
        "id": 85,
        "startTime": 199.71,
        "endTime": 200.34,
        "en_text": "Ooh Speed",
        "vi_text": "Ôi tốc độ",
        "ipa": "/u spid/"
      },
      {
        "id": 86,
        "startTime": 200.8,
        "endTime": 203.08,
        "en_text": "Where's your CRISTA RONALDO dress?",
        "vi_text": "Chiếc váy CRISTA RONALDO của bạn đâu?",
        "ipa": "/wɛrz jʊr ˈkrɪstə ronaldo* drɛs?/"
      },
      {
        "id": 87,
        "startTime": 203.5,
        "endTime": 205.54,
        "en_text": "I'm washing it",
        "vi_text": "Tôi đang giặt nó",
        "ipa": "/əm ˈwɑʃɪŋ ɪt/"
      },
      {
        "id": 88,
        "startTime": 205.75,
        "endTime": 206.34,
        "en_text": "What?",
        "vi_text": "Cái gì?",
        "ipa": "/wət?/"
      },
      {
        "id": 89,
        "startTime": 207.17,
        "endTime": 208.66,
        "en_text": "Oh no...",
        "vi_text": "Ồ không...",
        "ipa": "/oʊ noʊ.../"
      },
      {
        "id": 90,
        "startTime": 210.57,
        "endTime": 211.78,
        "en_text": "LET'S GOOOOO!",
        "vi_text": "HÃY TUYỆT VỜI!",
        "ipa": "/lɛts gooooo*!/"
      },
      {
        "id": 91,
        "startTime": 212.4,
        "endTime": 213.67,
        "en_text": "Look Mummy...",
        "vi_text": "Nhìn mẹ ơi...",
        "ipa": "/lʊk ˈməmi.../"
      },
      {
        "id": 92,
        "startTime": 213.96,
        "endTime": 216.22,
        "en_text": "a signed Ronaldo shirt",
        "vi_text": "áo có chữ ký của Ronaldo",
        "ipa": "/ə saɪnd ronaldo* ʃərt/"
      },
      {
        "id": 93,
        "startTime": 216.71,
        "endTime": 217.53,
        "en_text": "Yes Speed...",
        "vi_text": "Vâng Tốc độ...",
        "ipa": "/jɛs spid.../"
      },
      {
        "id": 94,
        "startTime": 217.53,
        "endTime": 219.8,
        "en_text": "but look what it's done to everything else",
        "vi_text": "nhưng hãy nhìn xem nó đã làm gì với mọi thứ khác",
        "ipa": "/bət lʊk wət ɪts dən tɪ ˈɛvriˌθɪŋ ɛls/"
      },
      {
        "id": 95,
        "startTime": 220.63,
        "endTime": 221.27,
        "en_text": "NARRATOR: Oh dear!",
        "vi_text": "NGƯỜI TƯỜNG THUẬT: Ôi trời!",
        "ipa": "/ˈnɛreɪtər: oʊ dɪr!/"
      },
      {
        "id": 96,
        "startTime": 222.35,
        "endTime": 223.9,
        "en_text": "NARRATOR: Daddy Pig is home from work.",
        "vi_text": "NGƯỜI DẪN: Bố Heo đi làm về.",
        "ipa": "/ˈnɛreɪtər: ˈdædi pɪg ɪz hoʊm frəm wərk./"
      },
      {
        "id": 97,
        "startTime": 224.92,
        "endTime": 226.12,
        "en_text": "Hello everyone!",
        "vi_text": "Xin chào tất cả mọi người!",
        "ipa": "/hɛˈloʊ ˈɛvriˌwən!/"
      },
      {
        "id": 98,
        "startTime": 226.12,
        "endTime": 227.45,
        "en_text": "Yo big a** daddy man",
        "vi_text": "Yo lớn a** bố ơi",
        "ipa": "/joʊ bɪg ə** ˈdædi mæn/"
      },
      {
        "id": 99,
        "startTime": 227.67,
        "endTime": 229.21,
        "en_text": "Uh... Daddy Pig?",
        "vi_text": "Ờ... Bố lợn à?",
        "ipa": "/ə... ˈdædi pɪg?/"
      },
      {
        "id": 100,
        "startTime": 229.57,
        "endTime": 231.14,
        "en_text": "We've got a bit of a problem...",
        "vi_text": "Chúng tôi có một chút vấn đề...",
        "ipa": "/wiv gɑt ə bɪt əv ə ˈprɑbləm.../"
      },
      {
        "id": 101,
        "startTime": 231.63,
        "endTime": 233.01,
        "en_text": "Tell me later Mummy Pig...",
        "vi_text": "Sau này kể cho mẹ nghe nhé Lợn Mẹ...",
        "ipa": "/tɛl mi ˈleɪtər ˈməmi pɪg.../"
      },
      {
        "id": 102,
        "startTime": 233.13,
        "endTime": 234.32,
        "en_text": "I've got to get ready for...",
        "vi_text": "Tôi phải chuẩn bị cho...",
        "ipa": "/aɪv gɑt tɪ gɪt ˈrɛdi fər.../"
      },
      {
        "id": 103,
        "startTime": 234.32,
        "endTime": 235.63,
        "en_text": "FOOTBAAAAAALLL",
        "vi_text": "BÓNG ĐÁAAAAALL",
        "ipa": "/footbaaaaaalll*/"
      },
      {
        "id": 104,
        "startTime": 235.91,
        "endTime": 237.34,
        "en_text": "Now where's my football shirt?",
        "vi_text": "Bây giờ áo bóng đá của tôi đâu?",
        "ipa": "/naʊ wɛrz maɪ ˈfʊtˌbɔl ʃərt?/"
      },
      {
        "id": 105,
        "startTime": 237.58,
        "endTime": 238.34,
        "en_text": "Here",
        "vi_text": "Đây",
        "ipa": "/hir/"
      },
      {
        "id": 106,
        "startTime": 239.25,
        "endTime": 240.72,
        "en_text": "Don't be silly Speed",
        "vi_text": "Đừng ngớ ngẩn Tốc độ",
        "ipa": "/doʊnt bi ˈsɪli spid/"
      },
      {
        "id": 107,
        "startTime": 241.06,
        "endTime": 242.69,
        "en_text": "That's one of mummy's dresses",
        "vi_text": "Đó là một trong những chiếc váy của mẹ",
        "ipa": "/ðæts wən əv ˈməmiz ˈdrɛsɪz/"
      },
      {
        "id": 108,
        "startTime": 243.47,
        "endTime": 244.61,
        "en_text": "No Daddy...",
        "vi_text": "Không bố...",
        "ipa": "/noʊ ˈdædi.../"
      },
      {
        "id": 109,
        "startTime": 244.99,
        "endTime": 247.14,
        "en_text": "It's your football shirt",
        "vi_text": "Đó là áo bóng đá của bạn",
        "ipa": "/ɪts jʊr ˈfʊtˌbɔl ʃərt/"
      },
      {
        "id": 110,
        "startTime": 247.55,
        "endTime": 248.95,
        "en_text": "What do you think George?",
        "vi_text": "Bạn nghĩ gì George?",
        "ipa": "/wət du ju θɪŋk ʤɔrʤ?/"
      },
      {
        "id": 111,
        "startTime": 249.22,
        "endTime": 250.06,
        "en_text": "Yuck!",
        "vi_text": "Quá tệ!",
        "ipa": "/jək!/"
      },
      {
        "id": 112,
        "startTime": 250.25,
        "endTime": 252.39,
        "en_text": "George does not like Messi",
        "vi_text": "George không thích Messi",
        "ipa": "/ʤɔrʤ dɪz nɑt laɪk messi*/"
      },
      {
        "id": 113,
        "startTime": 252.88,
        "endTime": 253.6,
        "en_text": "*doorbell rings*",
        "vi_text": "*chuông cửa reo*",
        "ipa": "/*ˈdɔrˌbɛl rɪŋz*/"
      },
      {
        "id": 114,
        "startTime": 254.32,
        "endTime": 256.04,
        "en_text": "NARRATOR: Here are Daddy Pig's friends",
        "vi_text": "NGƯỜI DẪN: Đây là bạn của Lợn Bố",
        "ipa": "/ˈnɛreɪtər: hir ər ˈdædi pɪgz frɛndz/"
      },
      {
        "id": 115,
        "startTime": 256.76,
        "endTime": 257.71,
        "en_text": "MOOOOOOO!!!!",
        "vi_text": "MOOOOOOO!!!!",
        "ipa": "/mooooooo*!!!!/"
      },
      {
        "id": 116,
        "startTime": 257.87,
        "endTime": 260.44,
        "en_text": "Is yo big a** Daddy coming out to play?",
        "vi_text": "Con lớn rồi Bố có ra ngoài chơi không?",
        "ipa": "/ɪz joʊ bɪg ə** ˈdædi ˈkəmɪŋ aʊt tɪ pleɪ?/"
      },
      {
        "id": 117,
        "startTime": 260.59,
        "endTime": 262.16,
        "en_text": "He'll just be a moment",
        "vi_text": "Anh ấy sẽ chỉ ở một lát thôi",
        "ipa": "/hil ʤɪst bi ə ˈmoʊmənt/"
      },
      {
        "id": 118,
        "startTime": 262.72,
        "endTime": 264.71,
        "en_text": "I need a RONALDO shirt",
        "vi_text": "Tôi cần một chiếc áo RONALDO",
        "ipa": "/aɪ nid ə ronaldo* ʃərt/"
      },
      {
        "id": 119,
        "startTime": 265.0,
        "endTime": 268.48,
        "en_text": "But Daddy, you have a RONALDO shirt",
        "vi_text": "Nhưng bố ơi, bố có áo RONALDO",
        "ipa": "/bət ˈdædi, ju hæv ə ronaldo* ʃərt/"
      },
      {
        "id": 120,
        "startTime": 268.82,
        "endTime": 270.77,
        "en_text": "Just take off your jacket",
        "vi_text": "Chỉ cần cởi áo khoác của bạn",
        "ipa": "/ʤɪst teɪk ɔf jʊr ˈʤækɪt/"
      },
      {
        "id": 121,
        "startTime": 271.68,
        "endTime": 273.64,
        "en_text": "(comment down below if you're an OG :D)",
        "vi_text": "(bình luận bên dưới nếu bạn là OG :D)",
        "ipa": "/(ˈkɑmɛnt daʊn bɪˈloʊ ɪf jʊr ən ɑg :di)/"
      },
      {
        "id": 122,
        "startTime": 274.44,
        "endTime": 275.29,
        "en_text": "See...",
        "vi_text": "Nhìn thấy...",
        "ipa": "/si.../"
      },
      {
        "id": 123,
        "startTime": 275.88,
        "endTime": 277.44,
        "en_text": "Fantastic!",
        "vi_text": "Tuyệt vời!",
        "ipa": "/fænˈtæstɪk!/"
      },
      {
        "id": 124,
        "startTime": 277.91,
        "endTime": 279.14,
        "en_text": "PORTUGAL STAND UP!",
        "vi_text": "BỒ ĐÀO NHA ĐỨNG LÊN!",
        "ipa": "/ˈpɔrʧəgəl stænd əp!/"
      },
      {
        "id": 125,
        "startTime": 279.75,
        "endTime": 280.93,
        "en_text": "STAND UP PORTUGAL!",
        "vi_text": "ĐỨNG LÊN BỒ ĐÀO NHA!",
        "ipa": "/stænd əp ˈpɔrʧəgəl!/"
      },
      {
        "id": 126,
        "startTime": 282.24,
        "endTime": 283.21,
        "en_text": "Hello everyone!",
        "vi_text": "Xin chào tất cả mọi người!",
        "ipa": "/hɛˈloʊ ˈɛvriˌwən!/"
      },
      {
        "id": 127,
        "startTime": 283.47,
        "endTime": 284.77,
        "en_text": "Hello big a** daddy",
        "vi_text": "Xin chào bố lớn",
        "ipa": "/hɛˈloʊ bɪg ə** ˈdædi/"
      },
      {
        "id": 128,
        "startTime": 284.87,
        "endTime": 285.97,
        "en_text": "Like your shirt!",
        "vi_text": "Giống như chiếc áo sơ mi của bạn!",
        "ipa": "/laɪk jʊr ʃərt!/"
      },
      {
        "id": 129,
        "startTime": 286.15,
        "endTime": 286.76,
        "en_text": "SEWEY!",
        "vi_text": "MAY!",
        "ipa": "/sewey*!/"
      },
      {
        "id": 130,
        "startTime": 286.97,
        "endTime": 287.78,
        "en_text": "Thank you!",
        "vi_text": "Cảm ơn!",
        "ipa": "/θæŋk ju!/"
      },
      {
        "id": 131,
        "startTime": 288.26,
        "endTime": 288.85,
        "en_text": "Come on!",
        "vi_text": "Cố lên!",
        "ipa": "/kəm ɔn!/"
      },
      {
        "id": 132,
        "startTime": 289.06,
        "endTime": 289.98,
        "en_text": "Let's play Football!",
        "vi_text": "Hãy chơi bóng đá!",
        "ipa": "/lɛts pleɪ ˈfʊtˌbɔl!/"
      },
      {
        "id": 133,
        "startTime": 289.98,
        "endTime": 291.62,
        "en_text": "[WORL CUUUUP Music]",
        "vi_text": "[Nhạc CUUUUP THẾ GIỚI]",
        "ipa": "/[worl* cuuuup* mˈjuzɪk]/"
      },
      {
        "id": 134,
        "startTime": 294.3,
        "endTime": 295.4,
        "en_text": "COMMENTATOR: That's astonishing!",
        "vi_text": "NGƯỜI BÌNH LUẬN: Thật đáng kinh ngạc!",
        "ipa": "/ˈkɑmənˌteɪtər: ðæts əˈstɑnɪʃɪŋ!/"
      },
      {
        "id": 135,
        "startTime": 296.0,
        "endTime": 297.86,
        "en_text": "Absolutely world class!",
        "vi_text": "Tuyệt đối đẳng cấp thế giới!",
        "ipa": "/ˌæbsəˈlutli wərld klæs!/"
      },
      {
        "id": 136,
        "startTime": 298.23,
        "endTime": 299.47,
        "en_text": "SUUUUUUUUIIII",
        "vi_text": "SUUUUUUUIIIIII",
        "ipa": "/suuuuuuuuiiii*/"
      },
      {
        "id": 137,
        "startTime": 299.47,
        "endTime": 301.13,
        "en_text": "LET'S GOOOOOO!",
        "vi_text": "HÃY TUYỆT VỜI!",
        "ipa": "/lɛts goooooo*!/"
      },
      {
        "id": 138,
        "startTime": 302.36,
        "endTime": 303.06,
        "en_text": "*whistle blows*",
        "vi_text": "*còi thổi*",
        "ipa": "/*ˈwɪsəl bloʊz*/"
      },
      {
        "id": 139,
        "startTime": 304.29,
        "endTime": 304.88,
        "en_text": "COMMENTATOR: Ronaldo...",
        "vi_text": "BÌNH LUẬN: Ronaldo...",
        "ipa": "/ˈkɑmənˌteɪtər: ronaldo*.../"
      },
      {
        "id": 140,
        "startTime": 304.88,
        "endTime": 305.43,
        "en_text": "ENCARA MESSI",
        "vi_text": "ENCARA MESSI",
        "ipa": "/encara* messi*/"
      },
      {
        "id": 141,
        "startTime": 305.71,
        "endTime": 306.56,
        "en_text": "Aaaaahhh!",
        "vi_text": "Aaaahhh!",
        "ipa": "/aaaaahhh*!/"
      },
      {
        "id": 142,
        "startTime": 306.56,
        "endTime": 308.2,
        "en_text": "Ma hand...",
        "vi_text": "Mẹ tay...",
        "ipa": "/mɑ hænd.../"
      },
      {
        "id": 143,
        "startTime": 309.24,
        "endTime": 310.97,
        "en_text": "NARRATOR: Portugal has been given a penalty.",
        "vi_text": "NGƯỜI DẪN: Bồ Đào Nha được hưởng một quả phạt đền.",
        "ipa": "/ˈnɛreɪtər: ˈpɔrʧəgəl həz bɪn ˈgɪvɪn ə ˈpɛnəlti./"
      },
      {
        "id": 144,
        "startTime": 314.94,
        "endTime": 316.53,
        "en_text": "COMMENTATOR: Cristiano Ronaldo...",
        "vi_text": "BÌNH LUẬN: Cristiano Ronaldo...",
        "ipa": "/ˈkɑmənˌteɪtər: kristiˈɑnoʊ ronaldo*.../"
      },
      {
        "id": 145,
        "startTime": 317.2,
        "endTime": 318.09,
        "en_text": "Allah akbar...",
        "vi_text": "Allah akbar...",
        "ipa": "/ˈɑlə ˈɑkˌbɑr.../"
      },
      {
        "id": 146,
        "startTime": 318.49,
        "endTime": 319.39,
        "en_text": "sewey...",
        "vi_text": "may quá...",
        "ipa": "/sewey*.../"
      },
      {
        "id": 147,
        "startTime": 319.39,
        "endTime": 319.89,
        "en_text": "bismallah-",
        "vi_text": "bismallah-",
        "ipa": "/bismallah*-/"
      },
      {
        "id": 148,
        "startTime": 320.36,
        "endTime": 320.86,
        "en_text": "SHUT UP!",
        "vi_text": "CÂM MIỆNG!",
        "ipa": "/ʃət əp!/"
      },
      {
        "id": 149,
        "startTime": 322.9,
        "endTime": 324.11,
        "en_text": "COMMENTATOR: Cristiano Ronaldo...",
        "vi_text": "BÌNH LUẬN: Cristiano Ronaldo...",
        "ipa": "/ˈkɑmənˌteɪtər: kristiˈɑnoʊ ronaldo*.../"
      },
      {
        "id": 150,
        "startTime": 327.73,
        "endTime": 329.93,
        "en_text": "COMMENTATOR: And it's a moment of world cup history...",
        "vi_text": "BÌNH LUẬN: Và đó là một khoảnh khắc của lịch sử World Cup...",
        "ipa": "/ˈkɑmənˌteɪtər: ənd ɪts ə ˈmoʊmənt əv wərld kəp ˈhɪstəri.../"
      },
      {
        "id": 151,
        "startTime": 330.35,
        "endTime": 331.45,
        "en_text": "Portugal in front",
        "vi_text": "Bồ Đào Nha ở phía trước",
        "ipa": "/ˈpɔrʧəgəl ɪn frənt/"
      },
      {
        "id": 152,
        "startTime": 331.8,
        "endTime": 332.44,
        "en_text": "*full time whistle blows*",
        "vi_text": "*tiếng còi hết trận*",
        "ipa": "/*fʊl taɪm ˈwɪsəl bloʊz*/"
      },
      {
        "id": 153,
        "startTime": 334.06,
        "endTime": 335.56,
        "en_text": "SEWEEEEEY!",
        "vi_text": "TUYỆT VỜI!",
        "ipa": "/seweeeeey*!/"
      },
      {
        "id": 154,
        "startTime": 336.42,
        "endTime": 338.29,
        "en_text": "Messi ain't number one he number two!",
        "vi_text": "Messi không phải là số một mà là số hai!",
        "ipa": "/messi* eɪnt ˈnəmbər wən hi ˈnəmbər tu!/"
      },
      {
        "id": 155,
        "startTime": 339.17,
        "endTime": 340.5,
        "en_text": "Ronaldo number one!",
        "vi_text": "Ronaldo số một!",
        "ipa": "/ronaldo* ˈnəmbər wən!/"
      },
      {
        "id": 156,
        "startTime": 340.91,
        "endTime": 342.76,
        "en_text": "Gotta hear this s*** every damn day...",
        "vi_text": "Phải nghe thứ chết tiệt này mỗi ngày...",
        "ipa": "/ˈgɑtə hir ðɪs ɛs*** ˈɛvəri dæm deɪ.../"
      },
      {
        "id": 157,
        "startTime": 343.35,
        "endTime": 344.7,
        "en_text": "Hohoho...",
        "vi_text": "Hohoho...",
        "ipa": "/hohoho*.../"
      },
      {
        "id": 158,
        "startTime": 345.9,
        "endTime": 346.54,
        "en_text": "Ben",
        "vi_text": "Ben",
        "ipa": "/bɛn/"
      },
      {
        "id": 159,
        "startTime": 347.79,
        "endTime": 348.35,
        "en_text": "Ben",
        "vi_text": "Ben",
        "ipa": "/bɛn/"
      },
      {
        "id": 160,
        "startTime": 348.74,
        "endTime": 349.87,
        "en_text": "NOOOOOOOOOO!",
        "vi_text": "KHÔNGOOOOOOOO!",
        "ipa": "/noooooooooo*!/"
      },
      {
        "id": 161,
        "startTime": 350.09,
        "endTime": 350.59,
        "en_text": "Ben",
        "vi_text": "Ben",
        "ipa": "/bɛn/"
      },
      {
        "id": 162,
        "startTime": 350.65,
        "endTime": 351.15,
        "en_text": "Ben",
        "vi_text": "Ben",
        "ipa": "/bɛn/"
      },
      {
        "id": 163,
        "startTime": 351.23,
        "endTime": 352.02,
        "en_text": "Ben ben",
        "vi_text": "Ben Ben",
        "ipa": "/bɛn bɛn/"
      },
      {
        "id": 164,
        "startTime": 352.06,
        "endTime": 353.27,
        "en_text": "Damn bruh...",
        "vi_text": "Khốn kiếp...",
        "ipa": "/dæm bruh*.../"
      },
      {
        "id": 165,
        "startTime": 353.35,
        "endTime": 355.47,
        "en_text": "Ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben",
        "vi_text": "Ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben ben",
        "ipa": "/bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn bɛn/"
      },
      {
        "id": 166,
        "startTime": 355.47,
        "endTime": 356.6,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      }
    ]
  },
  {
    "id": "ep_8",
    "title": "Tập 8 (Auto Generated)",
    "youtubeId": "ZxhhOlVVFcM",
    "subtitles": [
      {
        "id": 1,
        "startTime": 2.68,
        "endTime": 10.32,
        "en_text": "I'm Peppa Pig this is my little brother",
        "vi_text": "Tôi là Peppa Pig đây là em trai tôi",
        "ipa": "/əm peppa* pɪg ðɪs ɪz maɪ ˈlɪtəl ˈbrəðər/"
      },
      {
        "id": 2,
        "startTime": 6.44,
        "endTime": 12.52,
        "en_text": "George this is mommy pig and this is",
        "vi_text": "George đây là lợn mẹ và đây là",
        "ipa": "/ʤɔrʤ ðɪs ɪz ˈmɑmi pɪg ənd ðɪs ɪz/"
      },
      {
        "id": 3,
        "startTime": 10.32,
        "endTime": 16.0,
        "en_text": "Daddy",
        "vi_text": "Bố",
        "ipa": "/ˈdædi/"
      },
      {
        "id": 4,
        "startTime": 12.52,
        "endTime": 16.0,
        "en_text": "Pig Peppa",
        "vi_text": "Peppa lợn",
        "ipa": "/pɪg peppa*/"
      },
      {
        "id": 5,
        "startTime": 17.04,
        "endTime": 23.76,
        "en_text": "Pig George's",
        "vi_text": "lợn George",
        "ipa": "/pɪg ˈʤɔrʤɪz/"
      },
      {
        "id": 6,
        "startTime": 19.92,
        "endTime": 26.92,
        "en_text": "friend Peppa and her friends are at the",
        "vi_text": "bạn Peppa và bạn của cô ấy đang ở",
        "ipa": "/frɛnd peppa* ənd hər frɛndz ər æt ðə/"
      },
      {
        "id": 7,
        "startTime": 23.76,
        "endTime": 33.04,
        "en_text": "playground Peppa Susie and Danny are on",
        "vi_text": "sân chơi Peppa Susie và Danny đang ở trên",
        "ipa": "/ˈpleɪˌgraʊnd peppa* ˈsuzi ənd ˈdæni ər ɔn/"
      },
      {
        "id": 8,
        "startTime": 26.92,
        "endTime": 33.04,
        "en_text": "the are you all ready ready then let's",
        "vi_text": "tất cả các bạn đã sẵn sàng chưa vậy thì hãy",
        "ipa": "/ðə ər ju ɔl ˈrɛdi ˈrɛdi ðɛn lɛts/"
      },
      {
        "id": 9,
        "startTime": 33.81,
        "endTime": 36.93,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 10,
        "startTime": 41.44,
        "endTime": 47.8,
        "en_text": "go George is a bit too little for the",
        "vi_text": "đi nào George hơi quá nhỏ so với",
        "ipa": "/goʊ ʤɔrʤ ɪz ə bɪt tu ˈlɪtəl fər ðə/"
      },
      {
        "id": 11,
        "startTime": 44.0,
        "endTime": 47.8,
        "en_text": "roundabout he is playing on the",
        "vi_text": "bùng binh anh ấy đang chơi trên",
        "ipa": "/ˈraʊndəˌbaʊt hi ɪz pleɪɪŋ ɔn ðə/"
      },
      {
        "id": 12,
        "startTime": 49.04,
        "endTime": 55.16,
        "en_text": "swing here is Rebecca rabbit with her",
        "vi_text": "xoay ở đây là thỏ Rebecca với cô ấy",
        "ipa": "/swɪŋ hir ɪz rəˈbɛkə ˈræbɪt wɪθ hər/"
      },
      {
        "id": 13,
        "startTime": 51.88,
        "endTime": 58.68,
        "en_text": "little brother Richard Rabbit s hello",
        "vi_text": "xin chào em trai Richard Rabbit",
        "ipa": "/ˈlɪtəl ˈbrəðər ˈrɪʧərd ˈræbɪt ɛs hɛˈloʊ/"
      },
      {
        "id": 14,
        "startTime": 55.16,
        "endTime": 62.24,
        "en_text": "everyone s s",
        "vi_text": "mọi người đều",
        "ipa": "/ˈɛvriˌwən ɛs ɛs/"
      },
      {
        "id": 15,
        "startTime": 58.68,
        "endTime": 63.64,
        "en_text": "hello can I I come on the roundabout too",
        "vi_text": "xin chào tôi có thể đi theo đường vòng không?",
        "ipa": "/hɛˈloʊ kən aɪ aɪ kəm ɔn ðə ˈraʊndəˌbaʊt tu/"
      },
      {
        "id": 16,
        "startTime": 62.24,
        "endTime": 68.56,
        "en_text": "hop on",
        "vi_text": "nhảy lên",
        "ipa": "/hɑp ɔn/"
      },
      {
        "id": 17,
        "startTime": 63.64,
        "endTime": 70.04,
        "en_text": "Rebecca let's go really really fast s",
        "vi_text": "Rebecca hãy đi thật nhanh nhé s",
        "ipa": "/rəˈbɛkə lɛts goʊ ˈrɪli ˈrɪli fæst ɛs/"
      },
      {
        "id": 18,
        "startTime": 68.56,
        "endTime": 74.0,
        "en_text": "Richard Rabbit wants to go on the",
        "vi_text": "Richard Rabbit muốn tiếp tục",
        "ipa": "/ˈrɪʧərd ˈræbɪt wɔnts tɪ goʊ ɔn ðə/"
      },
      {
        "id": 19,
        "startTime": 70.04,
        "endTime": 77.96,
        "en_text": "roundabout too a if Richard gets on it",
        "vi_text": "bùng binh quá a nếu Richard đi được",
        "ipa": "/ˈraʊndəˌbaʊt tu ə ɪf ˈrɪʧərd gɪts ɔn ɪt/"
      },
      {
        "id": 20,
        "startTime": 74.0,
        "endTime": 80.96,
        "en_text": "means we can't go fast Richard can play",
        "vi_text": "nghĩa là chúng ta không thể đi nhanh Richard có thể chơi",
        "ipa": "/minz wi kænt goʊ fæst ˈrɪʧərd kən pleɪ/"
      },
      {
        "id": 21,
        "startTime": 77.96,
        "endTime": 84.36,
        "en_text": "with George Richard would you like to",
        "vi_text": "với George Richard bạn có muốn",
        "ipa": "/wɪθ ʤɔrʤ ˈrɪʧərd wʊd ju laɪk tɪ/"
      },
      {
        "id": 22,
        "startTime": 80.96,
        "endTime": 88.04,
        "en_text": "play with George No George has a",
        "vi_text": "chơi với George Không George có một",
        "ipa": "/pleɪ wɪθ ʤɔrʤ noʊ ʤɔrʤ həz ə/"
      },
      {
        "id": 23,
        "startTime": 84.36,
        "endTime": 90.52,
        "en_text": "dinosaur just like yours let's go and",
        "vi_text": "con khủng long giống như của bạn hãy đi và",
        "ipa": "/ˈdaɪnəˌsɔr ʤɪst laɪk jʊrz lɛts goʊ ənd/"
      },
      {
        "id": 24,
        "startTime": 88.04,
        "endTime": 94.48,
        "en_text": "see Richard Rabbit is the the same age",
        "vi_text": "thấy Richard Rabbit bằng tuổi",
        "ipa": "/si ˈrɪʧərd ˈræbɪt ɪz ðə ðə seɪm eɪʤ/"
      },
      {
        "id": 25,
        "startTime": 90.52,
        "endTime": 97.24,
        "en_text": "as George Richard wanted to see George's",
        "vi_text": "như George Richard muốn gặp George's",
        "ipa": "/ɛz ʤɔrʤ ˈrɪʧərd ˈwɔntɪd tɪ si ˈʤɔrʤɪz/"
      },
      {
        "id": 26,
        "startTime": 94.48,
        "endTime": 100.08,
        "en_text": "dinosaur",
        "vi_text": "khủng long",
        "ipa": "/ˈdaɪnəˌsɔr/"
      },
      {
        "id": 27,
        "startTime": 97.24,
        "endTime": 100.92,
        "en_text": "dinosaur George can Richard play with",
        "vi_text": "khủng long George có thể chơi cùng Richard",
        "ipa": "/ˈdaɪnəˌsɔr ʤɔrʤ kən ˈrɪʧərd pleɪ wɪθ/"
      },
      {
        "id": 28,
        "startTime": 100.08,
        "endTime": 104.52,
        "en_text": "your",
        "vi_text": "của bạn",
        "ipa": "/jʊr/"
      },
      {
        "id": 29,
        "startTime": 100.92,
        "endTime": 108.48,
        "en_text": "dinosaur no Richard can George play with",
        "vi_text": "con khủng long không Richard có thể chơi cùng George",
        "ipa": "/ˈdaɪnəˌsɔr noʊ ˈrɪʧərd kən ʤɔrʤ pleɪ wɪθ/"
      },
      {
        "id": 30,
        "startTime": 104.52,
        "endTime": 112.2,
        "en_text": "your dinosaur no George and Richard do",
        "vi_text": "con khủng long của bạn không có George và Richard làm",
        "ipa": "/jʊr ˈdaɪnəˌsɔr noʊ ʤɔrʤ ənd ˈrɪʧərd du/"
      },
      {
        "id": 31,
        "startTime": 108.48,
        "endTime": 115.32,
        "en_text": "not want to share their dinosaurs George",
        "vi_text": "không muốn chia sẻ khủng long của họ George",
        "ipa": "/nɑt wɔnt tɪ ʃɛr ðɛr ˈdaɪnəˌsɔrz ʤɔrʤ/"
      },
      {
        "id": 32,
        "startTime": 112.2,
        "endTime": 120.92,
        "en_text": "it will be much more fun if you",
        "vi_text": "sẽ vui hơn nhiều nếu bạn",
        "ipa": "/ɪt wɪl bi məʧ mɔr fən ɪf ju/"
      },
      {
        "id": 33,
        "startTime": 115.32,
        "endTime": 120.92,
        "en_text": "share that was really nice of George",
        "vi_text": "chia sẻ điều đó thực sự tốt đẹp về George",
        "ipa": "/ʃɛr ðət wɑz ˈrɪli nis əv ʤɔrʤ/"
      },
      {
        "id": 34,
        "startTime": 122.64,
        "endTime": 130.4,
        "en_text": "dinosaur George does not like sharing",
        "vi_text": "khủng long George không thích chia sẻ",
        "ipa": "/ˈdaɪnəˌsɔr ʤɔrʤ dɪz nɑt laɪk ˈʃɛrɪŋ/"
      },
      {
        "id": 35,
        "startTime": 125.68,
        "endTime": 130.4,
        "en_text": "Richard let George hold the dinosaurs",
        "vi_text": "Richard để George giữ khủng long",
        "ipa": "/ˈrɪʧərd lɛt ʤɔrʤ hoʊld ðə ˈdaɪnəˌsɔrz/"
      },
      {
        "id": 36,
        "startTime": 130.68,
        "endTime": 137.92,
        "en_text": "now Richard does not like sharing",
        "vi_text": "bây giờ Richard không thích chia sẻ",
        "ipa": "/naʊ ˈrɪʧərd dɪz nɑt laɪk ˈʃɛrɪŋ/"
      },
      {
        "id": 37,
        "startTime": 134.64,
        "endTime": 140.8,
        "en_text": "either what's all this crying about",
        "vi_text": "hoặc chuyện gì đang khóc thế này",
        "ipa": "/ˈiðər wəts ɔl ðɪs kraɪɪŋ əˈbaʊt/"
      },
      {
        "id": 38,
        "startTime": 137.92,
        "endTime": 143.64,
        "en_text": "George and Richard always cry when they",
        "vi_text": "George và Richard luôn khóc khi họ",
        "ipa": "/ʤɔrʤ ənd ˈrɪʧərd ˈɔlˌweɪz kraɪ wɪn ðeɪ/"
      },
      {
        "id": 39,
        "startTime": 140.8,
        "endTime": 146.2,
        "en_text": "play together they're just too little to",
        "vi_text": "chơi cùng nhau, chúng quá nhỏ để",
        "ipa": "/pleɪ təˈgɛðər ðɛr ʤɪst tu ˈlɪtəl tɪ/"
      },
      {
        "id": 40,
        "startTime": 143.64,
        "endTime": 149.16,
        "en_text": "play properly can you two big girls",
        "vi_text": "chơi đàng hoàng nhé hai cô gái lớn",
        "ipa": "/pleɪ ˈprɑpərli kən ju tu bɪg gərlz/"
      },
      {
        "id": 41,
        "startTime": 146.2,
        "endTime": 151.92,
        "en_text": "teach them to play together of course we",
        "vi_text": "dạy chúng chơi cùng nhau tất nhiên là chúng ta",
        "ipa": "/tiʧ ðɛm tɪ pleɪ təˈgɛðər əv kɔrs wi/"
      },
      {
        "id": 42,
        "startTime": 149.16,
        "endTime": 157.6,
        "en_text": "can help them make sand castles good",
        "vi_text": "có thể giúp họ làm lâu đài cát tốt",
        "ipa": "/kən hɛlp ðɛm meɪk sænd ˈkæsəlz gʊd/"
      },
      {
        "id": 43,
        "startTime": 151.92,
        "endTime": 161.56,
        "en_text": "idea let's go to the sand pit s",
        "vi_text": "ý tưởng chúng ta hãy đi đến hố cát",
        "ipa": "/aɪˈdiə lɛts goʊ tɪ ðə sænd pɪt ɛs/"
      },
      {
        "id": 44,
        "startTime": 157.6,
        "endTime": 165.04,
        "en_text": "s George and Richard love the sand pit",
        "vi_text": "George và Richard thích hố cát",
        "ipa": "/ɛs ʤɔrʤ ənd ˈrɪʧərd ləv ðə sænd pɪt/"
      },
      {
        "id": 45,
        "startTime": 161.56,
        "endTime": 166.64,
        "en_text": "George Richard today we are going to",
        "vi_text": "George Richard hôm nay chúng ta sẽ",
        "ipa": "/ʤɔrʤ ˈrɪʧərd təˈdeɪ wi ər goʊɪŋ tɪ/"
      },
      {
        "id": 46,
        "startTime": 165.04,
        "endTime": 169.85,
        "en_text": "make sand",
        "vi_text": "làm cát",
        "ipa": "/meɪk sænd/"
      },
      {
        "id": 47,
        "startTime": 166.64,
        "endTime": 172.04,
        "en_text": "castles first we fill the buckets with",
        "vi_text": "lâu đài đầu tiên chúng ta đổ đầy xô",
        "ipa": "/ˈkæsəlz fərst wi fɪl ðə ˈbəkəts wɪθ/"
      },
      {
        "id": 48,
        "startTime": 169.85,
        "endTime": 175.68,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 49,
        "startTime": 172.04,
        "endTime": 178.6,
        "en_text": "sand we turn the buckets over and give",
        "vi_text": "cát chúng tôi lật xô và đưa",
        "ipa": "/sænd wi tərn ðə ˈbəkəts ˈoʊvər ənd gɪv/"
      },
      {
        "id": 50,
        "startTime": 175.68,
        "endTime": 181.44,
        "en_text": "them a little",
        "vi_text": "họ một chút",
        "ipa": "/ðɛm ə ˈlɪtəl/"
      },
      {
        "id": 51,
        "startTime": 178.6,
        "endTime": 184.76,
        "en_text": "tap now now we lift the",
        "vi_text": "nhấn ngay bây giờ chúng tôi nâng",
        "ipa": "/tæp naʊ naʊ wi lɪft ðə/"
      },
      {
        "id": 52,
        "startTime": 181.44,
        "endTime": 188.28,
        "en_text": "buckets hey Presto Richard has made a",
        "vi_text": "xô này, Presto Richard đã thực hiện một",
        "ipa": "/ˈbəkəts heɪ ˈprɛˌstoʊ ˈrɪʧərd həz meɪd ə/"
      },
      {
        "id": 53,
        "startTime": 184.76,
        "endTime": 191.72,
        "en_text": "sand castle hey Presto and George has",
        "vi_text": "lâu đài cát này Presto và George có",
        "ipa": "/sænd ˈkæsəl heɪ ˈprɛˌstoʊ ənd ʤɔrʤ həz/"
      },
      {
        "id": 54,
        "startTime": 188.28,
        "endTime": 197.05,
        "en_text": "made a sand castle sque",
        "vi_text": "làm lâu đài cát",
        "ipa": "/meɪd ə sænd ˈkæsəl sque*/"
      },
      {
        "id": 55,
        "startTime": 191.72,
        "endTime": 202.13,
        "en_text": "sque you see playing together is",
        "vi_text": "sque bạn thấy chơi cùng nhau là",
        "ipa": "/sque* ju si pleɪɪŋ təˈgɛðər ɪz/"
      },
      {
        "id": 56,
        "startTime": 197.05,
        "endTime": 202.13,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 57,
        "startTime": 203.24,
        "endTime": 210.32,
        "en_text": "fun oh dear this game has not gone very",
        "vi_text": "vui quá trời ơi trò chơi này không hay lắm",
        "ipa": "/fən oʊ dɪr ðɪs geɪm həz nɑt gɔn ˈvɛri/"
      },
      {
        "id": 58,
        "startTime": 206.72,
        "endTime": 214.56,
        "en_text": "well it was your brother's fault he",
        "vi_text": "ồ đó là lỗi của anh trai bạn, anh ấy",
        "ipa": "/wɛl ɪt wɑz jʊr ˈbrəðərz fɔlt hi/"
      },
      {
        "id": 59,
        "startTime": 210.32,
        "endTime": 218.2,
        "en_text": "broke George's sand castle your brother",
        "vi_text": "đã phá vỡ lâu đài cát của George, anh trai bạn",
        "ipa": "/broʊk ˈʤɔrʤɪz sænd ˈkæsəl jʊr ˈbrəðər/"
      },
      {
        "id": 60,
        "startTime": 214.56,
        "endTime": 220.64,
        "en_text": "broke my brother's sand castle first now",
        "vi_text": "đã phá vỡ lâu đài cát của anh trai tôi trước tiên",
        "ipa": "/broʊk maɪ ˈbrəðərz sænd ˈkæsəl fərst naʊ/"
      },
      {
        "id": 61,
        "startTime": 218.2,
        "endTime": 222.48,
        "en_text": "now you two big girls are meant to be",
        "vi_text": "bây giờ hai cô gái lớn của các bạn có ý định trở thành",
        "ipa": "/naʊ ju tu bɪg gərlz ər mɛnt tɪ bi/"
      },
      {
        "id": 62,
        "startTime": 220.64,
        "endTime": 225.52,
        "en_text": "teaching Richard and George to play",
        "vi_text": "dạy Richard và George chơi đàn",
        "ipa": "/ˈtiʧɪŋ ˈrɪʧərd ənd ʤɔrʤ tɪ pleɪ/"
      },
      {
        "id": 63,
        "startTime": 222.48,
        "endTime": 228.12,
        "en_text": "nicely together that's right we're big",
        "vi_text": "bên nhau thật tuyệt vời, đúng vậy, chúng ta lớn",
        "ipa": "/ˈnaɪsli təˈgɛðər ðæts raɪt wɪr bɪg/"
      },
      {
        "id": 64,
        "startTime": 225.52,
        "endTime": 231.68,
        "en_text": "girls and George and Richard are too",
        "vi_text": "các cô gái và George và Richard cũng vậy",
        "ipa": "/gərlz ənd ʤɔrʤ ənd ˈrɪʧərd ər tu/"
      },
      {
        "id": 65,
        "startTime": 228.12,
        "endTime": 234.88,
        "en_text": "little to play together properly H I've",
        "vi_text": "ít để chơi cùng nhau đúng cách H Tôi đã",
        "ipa": "/ˈlɪtəl tɪ pleɪ təˈgɛðər ˈprɑpərli eɪʧ aɪv/"
      },
      {
        "id": 66,
        "startTime": 231.68,
        "endTime": 237.0,
        "en_text": "got an idea George what's your most",
        "vi_text": "có một ý tưởng, George điều gì là nhất của bạn",
        "ipa": "/gɑt ən aɪˈdiə ʤɔrʤ wəts jʊr moʊst/"
      },
      {
        "id": 67,
        "startTime": 234.88,
        "endTime": 242.28,
        "en_text": "favorite thing in the whole",
        "vi_text": "điều yêu thích trong toàn bộ",
        "ipa": "/ˈfeɪvərɪt θɪŋ ɪn ðə hoʊl/"
      },
      {
        "id": 68,
        "startTime": 237.0,
        "endTime": 242.28,
        "en_text": "playground seesaw George loves the",
        "vi_text": "sân chơi bập bênh George yêu thích",
        "ipa": "/ˈpleɪˌgraʊnd ˈsiˌsɔ ʤɔrʤ ləvz ðə/"
      },
      {
        "id": 69,
        "startTime": 244.2,
        "endTime": 246.64,
        "en_text": "Seesaw",
        "vi_text": "Chơi đu",
        "ipa": "/ˈsiˌsɔ/"
      },
      {
        "id": 70,
        "startTime": 245.26,
        "endTime": 249.2,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 71,
        "startTime": 246.64,
        "endTime": 252.12,
        "en_text": "seesaw it is a bit difficult to play on",
        "vi_text": "chơi bập bênh hơi khó chơi",
        "ipa": "/ˈsiˌsɔ ɪt ɪz ə bɪt ˈdɪfəkəlt tɪ pleɪ ɔn/"
      },
      {
        "id": 72,
        "startTime": 249.2,
        "endTime": 255.84,
        "en_text": "a seesaw on your",
        "vi_text": "một cái bập bênh trên của bạn",
        "ipa": "/ə ˈsiˌsɔ ɔn jʊr/"
      },
      {
        "id": 73,
        "startTime": 252.12,
        "endTime": 257.52,
        "en_text": "own sque Richard wants to play on the",
        "vi_text": "sque riêng Richard muốn chơi trên",
        "ipa": "/oʊn sque* ˈrɪʧərd wɔnts tɪ pleɪ ɔn ðə/"
      },
      {
        "id": 74,
        "startTime": 255.84,
        "endTime": 260.56,
        "en_text": "Seesaw",
        "vi_text": "Chơi đu",
        "ipa": "/ˈsiˌsɔ/"
      },
      {
        "id": 75,
        "startTime": 257.52,
        "endTime": 264.04,
        "en_text": "sea sea",
        "vi_text": "biển biển",
        "ipa": "/si si/"
      },
      {
        "id": 76,
        "startTime": 260.56,
        "endTime": 265.44,
        "en_text": "sea look George and Richard are playing",
        "vi_text": "biển nhìn George và Richard đang chơi đùa",
        "ipa": "/si lʊk ʤɔrʤ ənd ˈrɪʧərd ər pleɪɪŋ/"
      },
      {
        "id": 77,
        "startTime": 264.04,
        "endTime": 270.36,
        "en_text": "together",
        "vi_text": "cùng nhau",
        "ipa": "/təˈgɛðər/"
      },
      {
        "id": 78,
        "startTime": 265.44,
        "endTime": 273.44,
        "en_text": "SE SE SE SE",
        "vi_text": "SE SE SE SE SE",
        "ipa": "/seɪ seɪ seɪ seɪ/"
      },
      {
        "id": 79,
        "startTime": 270.36,
        "endTime": 277.08,
        "en_text": "George George likes",
        "vi_text": "George George thích",
        "ipa": "/ʤɔrʤ ʤɔrʤ laɪks/"
      },
      {
        "id": 80,
        "startTime": 273.44,
        "endTime": 281.44,
        "en_text": "Richard Richard likes George George and",
        "vi_text": "Richard Richard thích George George và",
        "ipa": "/ˈrɪʧərd ˈrɪʧərd laɪks ʤɔrʤ ʤɔrʤ ənd/"
      },
      {
        "id": 81,
        "startTime": 277.08,
        "endTime": 281.44,
        "en_text": "Richard like playing together",
        "vi_text": "Richard thích chơi cùng nhau",
        "ipa": "/ˈrɪʧərd laɪk pleɪɪŋ təˈgɛðər/"
      },
      {
        "id": 82,
        "startTime": 281.93,
        "endTime": 286.74,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      }
    ]
  },
  {
    "id": "ep_9",
    "title": "Tập 9 (Auto Generated)",
    "youtubeId": "x_UpKwhxKgA",
    "subtitles": [
      {
        "id": 1,
        "startTime": 0.08,
        "endTime": 7.92,
        "en_text": "grumpy rabbits jet pack it is a lovely",
        "vi_text": "gói máy bay phản lực thỏ gắt gỏng nó thật đáng yêu",
        "ipa": "/ˈgrəmpi ˈræbəts ʤɛt pæk ɪt ɪz ə ˈləvli/"
      },
      {
        "id": 2,
        "startTime": 4.56,
        "endTime": 10.52,
        "en_text": "snowy day pepper and her family are on a",
        "vi_text": "Pepper ngày tuyết rơi và gia đình cô ấy đang đi chơi",
        "ipa": "/snoʊi deɪ ˈpɛpər ənd hər ˈfæməli ər ɔn ə/"
      },
      {
        "id": 3,
        "startTime": 7.92,
        "endTime": 10.52,
        "en_text": "winter walk",
        "vi_text": "đi dạo mùa đông",
        "ipa": "/ˈwɪntər wɔk/"
      },
      {
        "id": 4,
        "startTime": 12.24,
        "endTime": 15.62,
        "en_text": "it's coming from grumpy rabbit's",
        "vi_text": "nó đến từ con thỏ gắt gỏng",
        "ipa": "/ɪts ˈkəmɪŋ frəm ˈgrəmpi rabbit's*/"
      },
      {
        "id": 5,
        "startTime": 14.1,
        "endTime": 19.98,
        "en_text": "Boatyard",
        "vi_text": "Bến thuyền",
        "ipa": "/ˈboʊˌtjɑrd/"
      },
      {
        "id": 6,
        "startTime": 15.62,
        "endTime": 20.72,
        "en_text": "here is grumpy rabbit hello",
        "vi_text": "đây là con thỏ gắt gỏng xin chào",
        "ipa": "/hir ɪz ˈgrəmpi ˈræbɪt hɛˈloʊ/"
      },
      {
        "id": 7,
        "startTime": 19.98,
        "endTime": 24.9,
        "en_text": "hello",
        "vi_text": "Xin chào",
        "ipa": "/hɛˈloʊ/"
      },
      {
        "id": 8,
        "startTime": 20.72,
        "endTime": 27.98,
        "en_text": "Pepper and George what are you doing ah",
        "vi_text": "Pepper và George bạn đang làm gì vậy",
        "ipa": "/ˈpɛpər ənd ʤɔrʤ wət ər ju duɪŋ ɑ/"
      },
      {
        "id": 9,
        "startTime": 24.9,
        "endTime": 32.04,
        "en_text": "I've been working on my latest project",
        "vi_text": "Tôi đang thực hiện dự án mới nhất của mình",
        "ipa": "/aɪv bɪn ˈwərkɪŋ ɔn maɪ ˈleɪtəst ˈprɑʤɛkt/"
      },
      {
        "id": 10,
        "startTime": 27.98,
        "endTime": 35.04,
        "en_text": "oh what is it well I couldn't decide",
        "vi_text": "ồ có chuyện gì vậy, tôi không thể quyết định được",
        "ipa": "/oʊ wət ɪz ɪt wɛl aɪ ˈkʊdənt ˌdɪˈsaɪd/"
      },
      {
        "id": 11,
        "startTime": 32.04,
        "endTime": 38.7,
        "en_text": "between building a sledge or a jet pack",
        "vi_text": "giữa việc chế tạo một chiếc xe trượt hay một chiếc máy bay phản lực",
        "ipa": "/bɪtˈwin ˈbɪldɪŋ ə slɛʤ ər ə ʤɛt pæk/"
      },
      {
        "id": 12,
        "startTime": 35.04,
        "endTime": 42.56,
        "en_text": "oh but as we've had all this snow I",
        "vi_text": "ồ nhưng vì chúng ta đã có nhiều tuyết thế này nên tôi",
        "ipa": "/oʊ bət ɛz wiv hæd ɔl ðɪs snoʊ aɪ/"
      },
      {
        "id": 13,
        "startTime": 38.7,
        "endTime": 47.7,
        "en_text": "decided to build a sledge a jet pack",
        "vi_text": "quyết định chế tạo một chiếc xe trượt tuyết và một chiếc máy bay phản lực",
        "ipa": "/ˌdɪˈsaɪdɪd tɪ bɪld ə slɛʤ ə ʤɛt pæk/"
      },
      {
        "id": 14,
        "startTime": 42.56,
        "endTime": 49.74,
        "en_text": "it's my personal flying machine wow that",
        "vi_text": "đó là máy bay cá nhân của tôi, ôi cái đó",
        "ipa": "/ɪts maɪ ˈpərsɪnəl flaɪɪŋ məˈʃin waʊ ðət/"
      },
      {
        "id": 15,
        "startTime": 47.7,
        "endTime": 52.02,
        "en_text": "must have been very difficult to build",
        "vi_text": "hẳn là rất khó xây dựng",
        "ipa": "/məst hæv bɪn ˈvɛri ˈdɪfəkəlt tɪ bɪld/"
      },
      {
        "id": 16,
        "startTime": 49.74,
        "endTime": 54.18,
        "en_text": "I'm not really it's all about",
        "vi_text": "Tôi không thực sự là tất cả về",
        "ipa": "/əm nɑt ˈrɪli ɪts ɔl əˈbaʊt/"
      },
      {
        "id": 17,
        "startTime": 52.02,
        "endTime": 57.18,
        "en_text": "calculating the weight to fuel",
        "vi_text": "tính trọng lượng nhiên liệu",
        "ipa": "/ˈkælkjəˌleɪtɪŋ ðə weɪt tɪ fjuəl/"
      },
      {
        "id": 18,
        "startTime": 54.18,
        "endTime": 60.6,
        "en_text": "efficiency ratio once you've done that",
        "vi_text": "tỷ lệ hiệu quả một khi bạn đã làm điều đó",
        "ipa": "/ɪˈfɪʃənsi ˈreɪʃiˌoʊ wəns juv dən ðət/"
      },
      {
        "id": 19,
        "startTime": 57.18,
        "endTime": 63.02,
        "en_text": "you just bash it all together with a",
        "vi_text": "bạn chỉ cần bash tất cả cùng với một",
        "ipa": "/ju ʤɪst bæʃ ɪt ɔl təˈgɛðər wɪθ ə/"
      },
      {
        "id": 20,
        "startTime": 60.6,
        "endTime": 63.02,
        "en_text": "hammer",
        "vi_text": "cái búa",
        "ipa": "/ˈhæmər/"
      },
      {
        "id": 21,
        "startTime": 64.22,
        "endTime": 74.1,
        "en_text": "amazing yes pure rabid craftsmanship",
        "vi_text": "tuyệt vời vâng, nghề thủ công tinh khiết thuần khiết",
        "ipa": "/əˈmeɪzɪŋ jɛs pjʊr ˈræbɪd ˈkræftsmənˌʃɪp/"
      },
      {
        "id": 22,
        "startTime": 70.32,
        "endTime": 78.44,
        "en_text": "why well I've not tried it yet let's",
        "vi_text": "tại sao tôi chưa thử nó, hãy",
        "ipa": "/waɪ wɛl aɪv nɑt traɪd ɪt jɛt lɛts/"
      },
      {
        "id": 23,
        "startTime": 74.1,
        "endTime": 81.96,
        "en_text": "find out safety harness check fuel check",
        "vi_text": "tìm hiểu dây an toàn kiểm tra kiểm tra nhiên liệu",
        "ipa": "/faɪnd aʊt ˈseɪfti ˈhɑrnɪs ʧɛk fjuəl ʧɛk/"
      },
      {
        "id": 24,
        "startTime": 78.44,
        "endTime": 85.62,
        "en_text": "key sandwiches check uh could you hold",
        "vi_text": "chìa khóa bánh sandwich kiểm tra xem bạn có thể giữ được không",
        "ipa": "/ki ˈsænwɪʧɪz ʧɛk ə kʊd ju hoʊld/"
      },
      {
        "id": 25,
        "startTime": 81.96,
        "endTime": 88.62,
        "en_text": "my lunch for me please is it safe yes",
        "vi_text": "xin vui lòng cho tôi bữa trưa, nó có an toàn không?",
        "ipa": "/maɪ lənʧ fər mi pliz ɪz ɪt seɪf jɛs/"
      },
      {
        "id": 26,
        "startTime": 85.62,
        "endTime": 91.56,
        "en_text": "it's only cheese and bread no I mean the",
        "vi_text": "chỉ có phô mai và bánh mì không ý tôi là",
        "ipa": "/ɪts ˈoʊnli ʧiz ənd brɛd noʊ aɪ min ðə/"
      },
      {
        "id": 27,
        "startTime": 88.62,
        "endTime": 92.08,
        "en_text": "jet pack of course it's safe I built it",
        "vi_text": "gói máy bay phản lực tất nhiên là an toàn tôi đã chế tạo nó",
        "ipa": "/ʤɛt pæk əv kɔrs ɪts seɪf aɪ bɪlt ɪt/"
      },
      {
        "id": 28,
        "startTime": 91.56,
        "endTime": 93.74,
        "en_text": "myself",
        "vi_text": "bản thân tôi",
        "ipa": "/ˌmaɪˈsɛlf/"
      },
      {
        "id": 29,
        "startTime": 92.08,
        "endTime": 97.2,
        "en_text": "[Laughter]",
        "vi_text": "[Cười]",
        "ipa": "/[ˈlæftər]/"
      },
      {
        "id": 30,
        "startTime": 93.74,
        "endTime": 99.72,
        "en_text": "moments from now I'd be flying high with",
        "vi_text": "khoảnh khắc từ bây giờ tôi sẽ bay cao với",
        "ipa": "/ˈmoʊmənts frəm naʊ aɪd bi flaɪɪŋ haɪ wɪθ/"
      },
      {
        "id": 31,
        "startTime": 97.2,
        "endTime": 102.66,
        "en_text": "nothing to see but the clouds in the sky",
        "vi_text": "không có gì để xem ngoài những đám mây trên bầu trời",
        "ipa": "/ˈnəθɪŋ tɪ si bət ðə klaʊdz ɪn ðə skaɪ/"
      },
      {
        "id": 32,
        "startTime": 99.72,
        "endTime": 106.14,
        "en_text": "the clouds the sky the clouds the sky",
        "vi_text": "những đám mây bầu trời những đám mây bầu trời",
        "ipa": "/ðə klaʊdz ðə skaɪ ðə klaʊdz ðə skaɪ/"
      },
      {
        "id": 33,
        "startTime": 102.66,
        "endTime": 109.22,
        "en_text": "how does it work easy I just pressed",
        "vi_text": "nó hoạt động dễ dàng như thế nào tôi vừa nhấn",
        "ipa": "/haʊ dɪz ɪt wərk ˈizi aɪ ʤɪst prɛst/"
      },
      {
        "id": 34,
        "startTime": 106.14,
        "endTime": 109.22,
        "en_text": "this big red button",
        "vi_text": "nút lớn màu đỏ này",
        "ipa": "/ðɪs bɪg rɛd ˈbətən/"
      },
      {
        "id": 35,
        "startTime": 109.32,
        "endTime": 113.42,
        "en_text": "well it definitely works",
        "vi_text": "ừ nó chắc chắn có tác dụng",
        "ipa": "/wɛl ɪt ˈdɛfənətli wərks/"
      },
      {
        "id": 36,
        "startTime": 120.72,
        "endTime": 125.28,
        "en_text": "oh",
        "vi_text": "Ồ",
        "ipa": "/oʊ/"
      },
      {
        "id": 37,
        "startTime": 122.12,
        "endTime": 126.68,
        "en_text": "grumpy rabbit has landed on Snowy",
        "vi_text": "con thỏ gắt gỏng đã hạ cánh trên Snowy",
        "ipa": "/ˈgrəmpi ˈræbɪt həz ˈlændɪd ɔn snoʊi/"
      },
      {
        "id": 38,
        "startTime": 125.28,
        "endTime": 129.87,
        "en_text": "Mountain",
        "vi_text": "Núi",
        "ipa": "/ˈmaʊntən/"
      },
      {
        "id": 39,
        "startTime": 126.68,
        "endTime": 132.44,
        "en_text": "let's check he's okay",
        "vi_text": "hãy kiểm tra xem anh ấy có ổn không",
        "ipa": "/lɛts ʧɛk hiz ˌoʊˈkeɪ/"
      },
      {
        "id": 40,
        "startTime": 129.87,
        "endTime": 135.66,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 41,
        "startTime": 132.44,
        "endTime": 139.32,
        "en_text": "hello grumpy rabbit speaking grumpy",
        "vi_text": "xin chào chú thỏ gắt gỏng đang nói chuyện gắt gỏng",
        "ipa": "/hɛˈloʊ ˈgrəmpi ˈræbɪt ˈspikɪŋ ˈgrəmpi/"
      },
      {
        "id": 42,
        "startTime": 135.66,
        "endTime": 143.54,
        "en_text": "rabbit are you all right yes I'm fine",
        "vi_text": "thỏ bạn ổn chứ vâng tôi ổn",
        "ipa": "/ˈræbɪt ər ju ɔl raɪt jɛs əm faɪn/"
      },
      {
        "id": 43,
        "startTime": 139.32,
        "endTime": 147.36,
        "en_text": "but my jet pack is broken",
        "vi_text": "nhưng gói máy bay phản lực của tôi bị hỏng",
        "ipa": "/bət maɪ ʤɛt pæk ɪz ˈbroʊkən/"
      },
      {
        "id": 44,
        "startTime": 143.54,
        "endTime": 151.82,
        "en_text": "rescue you grumpy rabbit thank you Peppa",
        "vi_text": "giải cứu con thỏ gắt gỏng cảm ơn Peppa",
        "ipa": "/ˈrɛskju ju ˈgrəmpi ˈræbɪt θæŋk ju peppa*/"
      },
      {
        "id": 45,
        "startTime": 147.36,
        "endTime": 151.82,
        "en_text": "let's call Miss Rabbit's rescue service",
        "vi_text": "hãy gọi dịch vụ giải cứu của Miss Rabbit",
        "ipa": "/lɛts kɔl mɪs rabbit's* ˈrɛskju ˈsərvɪs/"
      },
      {
        "id": 46,
        "startTime": 154.8,
        "endTime": 161.1,
        "en_text": "it's rabbit grumpy rabbit needs to be",
        "vi_text": "đó là con thỏ con thỏ gắt gỏng cần phải như vậy",
        "ipa": "/ɪts ˈræbɪt ˈgrəmpi ˈræbɪt nidz tɪ bi/"
      },
      {
        "id": 47,
        "startTime": 157.62,
        "endTime": 162.4,
        "en_text": "rescued I'll be right there she'll be",
        "vi_text": "được giải cứu tôi sẽ ở ngay đó cô ấy sẽ ở đó",
        "ipa": "/ˈrɛskjud aɪl bi raɪt ðɛr ʃil bi/"
      },
      {
        "id": 48,
        "startTime": 161.1,
        "endTime": 165.67,
        "en_text": "right here",
        "vi_text": "ngay tại đây",
        "ipa": "/raɪt hir/"
      },
      {
        "id": 49,
        "startTime": 162.4,
        "endTime": 165.67,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 50,
        "startTime": 167.76,
        "endTime": 176.3,
        "en_text": "right to the rescue",
        "vi_text": "quyền được giải cứu",
        "ipa": "/raɪt tɪ ðə ˈrɛskju/"
      },
      {
        "id": 51,
        "startTime": 170.66,
        "endTime": 176.3,
        "en_text": "uh where are we going to Snowy Mountains",
        "vi_text": "ừ chúng ta sẽ đi đâu đến Dãy núi Tuyết",
        "ipa": "/ə wɛr ər wi goʊɪŋ tɪ snoʊi ˈmaʊntənz/"
      },
      {
        "id": 52,
        "startTime": 176.66,
        "endTime": 182.7,
        "en_text": "trapped on a mountain with just the snow",
        "vi_text": "bị mắc kẹt trên một ngọn núi chỉ có tuyết",
        "ipa": "/træpt ɔn ə ˈmaʊntən wɪθ ʤɪst ðə snoʊ/"
      },
      {
        "id": 53,
        "startTime": 179.94,
        "endTime": 184.32,
        "en_text": "for company I should have made a sledge",
        "vi_text": "vì có bạn đồng hành, đáng lẽ tôi phải làm một chiếc xe trượt",
        "ipa": "/fər ˈkəmpəˌni aɪ ʃʊd hæv meɪd ə slɛʤ/"
      },
      {
        "id": 54,
        "startTime": 182.7,
        "endTime": 187.22,
        "en_text": "after all",
        "vi_text": "sau tất cả",
        "ipa": "/ˈæftər ɔl/"
      },
      {
        "id": 55,
        "startTime": 184.32,
        "endTime": 191.0,
        "en_text": "here is Miss Rabbit's rescue service",
        "vi_text": "đây là dịch vụ giải cứu của cô Thỏ",
        "ipa": "/hir ɪz mɪs rabbit's* ˈrɛskju ˈsərvɪs/"
      },
      {
        "id": 56,
        "startTime": 187.22,
        "endTime": 195.84,
        "en_text": "saved I'm saved",
        "vi_text": "đã cứu tôi đã được cứu",
        "ipa": "/seɪvd əm seɪvd/"
      },
      {
        "id": 57,
        "startTime": 191.0,
        "endTime": 198.42,
        "en_text": "around you and we'll carry you home",
        "vi_text": "xung quanh bạn và chúng tôi sẽ đưa bạn về nhà",
        "ipa": "/əraʊnd ju ənd wɪl ˈkɛri ju hoʊm/"
      },
      {
        "id": 58,
        "startTime": 195.84,
        "endTime": 202.46,
        "en_text": "ready",
        "vi_text": "sẵn sàng",
        "ipa": "/ˈrɛdi/"
      },
      {
        "id": 59,
        "startTime": 198.42,
        "endTime": 206.4,
        "en_text": "oh we've run out of fuel",
        "vi_text": "ôi chúng tôi hết nhiên liệu rồi",
        "ipa": "/oʊ wiv rən aʊt əv fjuəl/"
      },
      {
        "id": 60,
        "startTime": 202.46,
        "endTime": 210.12,
        "en_text": "oh dear the helicopter has stopped",
        "vi_text": "trời ơi trực thăng đã dừng rồi",
        "ipa": "/oʊ dɪr ðə ˈhɛlɪˌkɑptər həz stɑpt/"
      },
      {
        "id": 61,
        "startTime": 206.4,
        "endTime": 212.34,
        "en_text": "need rescuing now yes",
        "vi_text": "cần giải cứu bây giờ vâng",
        "ipa": "/nid ˈrɛskjuɪŋ naʊ jɛs/"
      },
      {
        "id": 62,
        "startTime": 210.12,
        "endTime": 214.76,
        "en_text": "if only we had some other way of getting",
        "vi_text": "giá như chúng ta có cách khác để có được",
        "ipa": "/ɪf ˈoʊnli wi hæd səm ˈəðər weɪ əv ˈgɪtɪŋ/"
      },
      {
        "id": 63,
        "startTime": 212.34,
        "endTime": 214.76,
        "en_text": "home",
        "vi_text": "trang chủ",
        "ipa": "/hoʊm/"
      },
      {
        "id": 64,
        "startTime": 218.58,
        "endTime": 224.04,
        "en_text": "rabbit is sliding down Snowy Mountain on",
        "vi_text": "thỏ đang trượt xuống Núi Tuyết trên",
        "ipa": "/ˈræbɪt ɪz sˈlaɪdɪŋ daʊn snoʊi ˈmaʊntən ɔn/"
      },
      {
        "id": 65,
        "startTime": 221.52,
        "endTime": 226.7,
        "en_text": "his jet pack and pulling the helicopter",
        "vi_text": "gói máy bay phản lực của anh ấy và kéo chiếc trực thăng",
        "ipa": "/hɪz ʤɛt pæk ənd ˈpʊlɪŋ ðə ˈhɛlɪˌkɑptər/"
      },
      {
        "id": 66,
        "startTime": 224.04,
        "endTime": 226.7,
        "en_text": "with him",
        "vi_text": "với anh ấy",
        "ipa": "/wɪθ ɪm/"
      },
      {
        "id": 67,
        "startTime": 228.8,
        "endTime": 235.28,
        "en_text": "through the trees down the High Street",
        "vi_text": "qua những hàng cây dọc đường High Street",
        "ipa": "/θru ðə triz daʊn ðə haɪ strit/"
      },
      {
        "id": 68,
        "startTime": 233.36,
        "endTime": 238.1,
        "en_text": "excuse us",
        "vi_text": "xin lỗi chúng tôi",
        "ipa": "/ɪkˈskjuz ˈjuˈɛs/"
      },
      {
        "id": 69,
        "startTime": 235.28,
        "endTime": 243.44,
        "en_text": "across the Frozen sea",
        "vi_text": "băng qua biển đông lạnh",
        "ipa": "/əˈkrɔs ðə ˈfroʊzən si/"
      },
      {
        "id": 70,
        "startTime": 238.1,
        "endTime": 243.44,
        "en_text": "and back to crampy rabbit's Boatyard",
        "vi_text": "và quay trở lại Boatyard của chú thỏ chật chội",
        "ipa": "/ənd bæk tɪ crampy* rabbit's* ˈboʊˌtjɑrd/"
      },
      {
        "id": 71,
        "startTime": 244.56,
        "endTime": 251.82,
        "en_text": "fun ever yes it was thank you for",
        "vi_text": "luôn vui vẻ vâng, đó là cảm ơn bạn vì",
        "ipa": "/fən ˈɛvər jɛs ɪt wɑz θæŋk ju fər/"
      },
      {
        "id": 72,
        "startTime": 248.94,
        "endTime": 256.14,
        "en_text": "rescuing me actually grumpy rabbit it",
        "vi_text": "cứu tôi thật đấy con thỏ gắt gỏng nó",
        "ipa": "/ˈrɛskjuɪŋ mi ˈæˌkʧuəli ˈgrəmpi ˈræbɪt ɪt/"
      },
      {
        "id": 73,
        "startTime": 251.82,
        "endTime": 258.48,
        "en_text": "was you who rescued us I suppose I did I",
        "vi_text": "chính bạn là người đã cứu chúng tôi, tôi cho là tôi đã làm vậy",
        "ipa": "/wɑz ju hu ˈrɛskjud ˈjuˈɛs aɪ səˈpoʊz aɪ dɪd aɪ/"
      },
      {
        "id": 74,
        "startTime": 256.14,
        "endTime": 259.88,
        "en_text": "built a jet pack that turned into a",
        "vi_text": "đã chế tạo một chiếc máy bay phản lực biến thành một",
        "ipa": "/bɪlt ə ʤɛt pæk ðət tərnd ˈɪntu ə/"
      },
      {
        "id": 75,
        "startTime": 258.48,
        "endTime": 263.22,
        "en_text": "sledge",
        "vi_text": "xe trượt tuyết",
        "ipa": "/slɛʤ/"
      },
      {
        "id": 76,
        "startTime": 259.88,
        "endTime": 267.3,
        "en_text": "grumpy rabbit loves jet packs that turn",
        "vi_text": "con thỏ gắt gỏng thích gói máy bay phản lực quay",
        "ipa": "/ˈgrəmpi ˈræbɪt ləvz ʤɛt pæks ðət tərn/"
      },
      {
        "id": 77,
        "startTime": 263.22,
        "endTime": 270.86,
        "en_text": "into sledges everybody loves jet packs",
        "vi_text": "vào xe trượt mọi người đều yêu thích gói máy bay phản lực",
        "ipa": "/ˈɪntu sledges* ˈɛvriˌbɑdi ləvz ʤɛt pæks/"
      },
      {
        "id": 78,
        "startTime": 267.3,
        "endTime": 270.86,
        "en_text": "that turn into sledges",
        "vi_text": "biến thành xe trượt tuyết",
        "ipa": "/ðət tərn ˈɪntu sledges*/"
      }
    ]
  },
  {
    "id": "ep_10",
    "title": "Tập 10 (Auto Generated)",
    "youtubeId": "_ZS3ciHF38k",
    "subtitles": [
      {
        "id": 1,
        "startTime": 3.52,
        "endTime": 8.32,
        "en_text": "i'm peppa pig",
        "vi_text": "tôi là lợn peppa",
        "ipa": "/əm peppa* pɪg/"
      },
      {
        "id": 2,
        "startTime": 5.36,
        "endTime": 10.48,
        "en_text": "this is my little brother george",
        "vi_text": "đây là em trai tôi, George",
        "ipa": "/ðɪs ɪz maɪ ˈlɪtəl ˈbrəðər ʤɔrʤ/"
      },
      {
        "id": 3,
        "startTime": 8.32,
        "endTime": 14.6,
        "en_text": "this is mummy pig",
        "vi_text": "đây là mẹ lợn",
        "ipa": "/ðɪs ɪz ˈməmi pɪg/"
      },
      {
        "id": 4,
        "startTime": 10.48,
        "endTime": 14.6,
        "en_text": "and this is daddy pig",
        "vi_text": "và đây là bố lợn",
        "ipa": "/ənd ðɪs ɪz ˈdædi pɪg/"
      },
      {
        "id": 5,
        "startTime": 18.88,
        "endTime": 23.95,
        "en_text": "pepper and george are spending the night",
        "vi_text": "Pepper và George sẽ qua đêm",
        "ipa": "/ˈpɛpər ənd ʤɔrʤ ər ˈspɛndɪŋ ðə naɪt/"
      },
      {
        "id": 6,
        "startTime": 20.96,
        "endTime": 25.92,
        "en_text": "at granny and grandpa pig's house",
        "vi_text": "ở nhà ông nội và lợn",
        "ipa": "/æt ˈgræni ənd ˈgrændˌpɑ pɪgz haʊs/"
      },
      {
        "id": 7,
        "startTime": 23.95,
        "endTime": 28.24,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 8,
        "startTime": 25.92,
        "endTime": 31.12,
        "en_text": "hello my little ones",
        "vi_text": "xin chào các bạn nhỏ của tôi",
        "ipa": "/hɛˈloʊ maɪ ˈlɪtəl wənz/"
      },
      {
        "id": 9,
        "startTime": 28.24,
        "endTime": 33.68,
        "en_text": "where is grandpa pig oh he's messing",
        "vi_text": "ông lợn đâu rồi ồ ông ấy đang lộn xộn",
        "ipa": "/wɛr ɪz ˈgrændˌpɑ pɪg oʊ hiz ˈmɛsɪŋ/"
      },
      {
        "id": 10,
        "startTime": 31.12,
        "endTime": 37.84,
        "en_text": "about at the bottom of the garden",
        "vi_text": "về phía cuối vườn",
        "ipa": "/əˈbaʊt æt ðə ˈbɑtəm əv ðə ˈgɑrdən/"
      },
      {
        "id": 11,
        "startTime": 33.68,
        "endTime": 41.52,
        "en_text": "here is grandpa pig grandpa pig hello",
        "vi_text": "đây là ông nội lợn ông nội lợn xin chào",
        "ipa": "/hir ɪz ˈgrændˌpɑ pɪg ˈgrændˌpɑ pɪg hɛˈloʊ/"
      },
      {
        "id": 12,
        "startTime": 37.84,
        "endTime": 44.48,
        "en_text": "pepper and george what are you doing i'm",
        "vi_text": "Pepper và George bạn đang làm gì vậy tôi đang làm gì vậy",
        "ipa": "/ˈpɛpər ənd ʤɔrʤ wət ər ju duɪŋ əm/"
      },
      {
        "id": 13,
        "startTime": 41.52,
        "endTime": 45.6,
        "en_text": "building somewhere for me to hide",
        "vi_text": "xây dựng một nơi nào đó để tôi ẩn náu",
        "ipa": "/ˈbɪldɪŋ ˈsəmˌwɛr fər mi tɪ haɪd/"
      },
      {
        "id": 14,
        "startTime": 44.48,
        "endTime": 47.68,
        "en_text": "why",
        "vi_text": "Tại sao",
        "ipa": "/waɪ/"
      },
      {
        "id": 15,
        "startTime": 45.6,
        "endTime": 51.6,
        "en_text": "well you see i really want to spot an",
        "vi_text": "ồ bạn thấy đấy, tôi thực sự muốn phát hiện ra một",
        "ipa": "/wɛl ju si aɪ ˈrɪli wɔnt tɪ spɑt ən/"
      },
      {
        "id": 16,
        "startTime": 47.68,
        "endTime": 54.16,
        "en_text": "owl and take it off in my book ah",
        "vi_text": "con cú và bỏ nó vào cuốn sách của tôi đi ah",
        "ipa": "/aʊl ənd teɪk ɪt ɔf ɪn maɪ bʊk ɑ/"
      },
      {
        "id": 17,
        "startTime": 51.6,
        "endTime": 57.44,
        "en_text": "i have spotted lots of different birds",
        "vi_text": "tôi đã phát hiện ra rất nhiều loài chim khác nhau",
        "ipa": "/aɪ hæv ˈspɑtɪd lɑts əv ˈdɪfərənt bərdz/"
      },
      {
        "id": 18,
        "startTime": 54.16,
        "endTime": 58.64,
        "en_text": "but never an owl because owls only come",
        "vi_text": "nhưng không bao giờ là cú vì cú chỉ đến",
        "ipa": "/bət ˈnɛvər ən aʊl bɪˈkəz aʊlz ˈoʊnli kəm/"
      },
      {
        "id": 19,
        "startTime": 57.44,
        "endTime": 60.8,
        "en_text": "out at night",
        "vi_text": "ra ngoài vào ban đêm",
        "ipa": "/aʊt æt naɪt/"
      },
      {
        "id": 20,
        "startTime": 58.64,
        "endTime": 62.08,
        "en_text": "and they are very shy",
        "vi_text": "và họ rất nhút nhát",
        "ipa": "/ənd ðeɪ ər ˈvɛri ʃaɪ/"
      },
      {
        "id": 21,
        "startTime": 60.8,
        "endTime": 65.92,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 22,
        "startTime": 62.08,
        "endTime": 69.6,
        "en_text": "so tonight i will hide in here",
        "vi_text": "nên tối nay tôi sẽ trốn ở đây",
        "ipa": "/soʊ təˈnaɪt aɪ wɪl haɪd ɪn hir/"
      },
      {
        "id": 23,
        "startTime": 65.92,
        "endTime": 71.84,
        "en_text": "and when an owl comes i will spot it",
        "vi_text": "và khi một con cú đến tôi sẽ nhận ra nó",
        "ipa": "/ənd wɪn ən aʊl kəmz aɪ wɪl spɑt ɪt/"
      },
      {
        "id": 24,
        "startTime": 69.6,
        "endTime": 74.96,
        "en_text": "clever grandpa",
        "vi_text": "ông nội thông minh",
        "ipa": "/ˈklɛvər ˈgrændˌpɑ/"
      },
      {
        "id": 25,
        "startTime": 71.84,
        "endTime": 78.0,
        "en_text": "first i have to use twigs and leaves to",
        "vi_text": "đầu tiên tôi phải dùng cành cây và lá để",
        "ipa": "/fərst aɪ hæv tɪ juz twɪgz ənd livz tɪ/"
      },
      {
        "id": 26,
        "startTime": 74.96,
        "endTime": 79.52,
        "en_text": "completely cover my hiding place we can",
        "vi_text": "che chắn hoàn toàn nơi ẩn náu của tôi, chúng ta có thể",
        "ipa": "/kəmˈplitli ˈkəvər maɪ ˈhaɪdɪŋ pleɪs wi kən/"
      },
      {
        "id": 27,
        "startTime": 78.0,
        "endTime": 81.76,
        "en_text": "help",
        "vi_text": "giúp đỡ",
        "ipa": "/hɛlp/"
      },
      {
        "id": 28,
        "startTime": 79.52,
        "endTime": 84.36,
        "en_text": "pepper collects twigs",
        "vi_text": "hạt tiêu nhặt cành cây",
        "ipa": "/ˈpɛpər kəˈlɛkts twɪgz/"
      },
      {
        "id": 29,
        "startTime": 81.76,
        "endTime": 88.16,
        "en_text": "george collects leaves",
        "vi_text": "George thu thập lá",
        "ipa": "/ʤɔrʤ kəˈlɛkts livz/"
      },
      {
        "id": 30,
        "startTime": 84.36,
        "endTime": 92.56,
        "en_text": "[Laughter]",
        "vi_text": "[Cười]",
        "ipa": "/[ˈlæftər]/"
      },
      {
        "id": 31,
        "startTime": 88.16,
        "endTime": 92.56,
        "en_text": "well done pepper and george",
        "vi_text": "làm tốt lắm Pepper và George",
        "ipa": "/wɛl dən ˈpɛpər ənd ʤɔrʤ/"
      },
      {
        "id": 32,
        "startTime": 93.52,
        "endTime": 99.56,
        "en_text": "look i am completely invisible",
        "vi_text": "nhìn này tôi hoàn toàn vô hình",
        "ipa": "/lʊk aɪ æm kəmˈplitli ˌɪnˈvɪzəbəl/"
      },
      {
        "id": 33,
        "startTime": 100.8,
        "endTime": 106.16,
        "en_text": "here are mr stallion and mrs corgi",
        "vi_text": "đây là ông ngựa giống và bà corgi",
        "ipa": "/hir ər ˈmɪstər ˈstæljən ənd ˈmɪsɪz ˈkɔrgi/"
      },
      {
        "id": 34,
        "startTime": 103.44,
        "endTime": 111.76,
        "en_text": "dressed as bushes",
        "vi_text": "ăn mặc như bụi cây",
        "ipa": "/drɛst ɛz ˈbʊʃəz/"
      },
      {
        "id": 35,
        "startTime": 106.16,
        "endTime": 111.76,
        "en_text": "hello have you seen grandpa pig anywhere",
        "vi_text": "xin chào bạn có thấy ông nội lợn ở đâu không",
        "ipa": "/hɛˈloʊ hæv ju sin ˈgrændˌpɑ pɪg ˈɛniˌwɛr/"
      },
      {
        "id": 36,
        "startTime": 111.92,
        "endTime": 118.64,
        "en_text": "good hiding place el chap and what may i",
        "vi_text": "nơi ẩn náu tốt el chap và tôi có thể làm gì",
        "ipa": "/gʊd ˈhaɪdɪŋ pleɪs ɛl ʧæp ənd wət meɪ aɪ/"
      },
      {
        "id": 37,
        "startTime": 115.52,
        "endTime": 121.36,
        "en_text": "ask are you two doing here we are out",
        "vi_text": "hỏi hai bạn đang làm gì ở đây chúng tôi ra ngoài",
        "ipa": "/æsk ər ju tu duɪŋ hir wi ər aʊt/"
      },
      {
        "id": 38,
        "startTime": 118.64,
        "endTime": 124.8,
        "en_text": "for a bit of bird spotting we are hoping",
        "vi_text": "để tìm hiểu một chút về loài chim, chúng tôi hy vọng",
        "ipa": "/fər ə bɪt əv bərd ˈspɑtɪŋ wi ər ˈhoʊpɪŋ/"
      },
      {
        "id": 39,
        "startTime": 121.36,
        "endTime": 127.76,
        "en_text": "to spot an owl tonight that's why we are",
        "vi_text": "để phát hiện một con cú tối nay đó là lý do tại sao chúng ta",
        "ipa": "/tɪ spɑt ən aʊl təˈnaɪt ðæts waɪ wi ər/"
      },
      {
        "id": 40,
        "startTime": 124.8,
        "endTime": 130.16,
        "en_text": "pretending to be bushes grandpa is going",
        "vi_text": "giả vờ là bụi cây ông nội đang đi",
        "ipa": "/priˈtɛndɪŋ tɪ bi ˈbʊʃəz ˈgrændˌpɑ ɪz goʊɪŋ/"
      },
      {
        "id": 41,
        "startTime": 127.76,
        "endTime": 133.12,
        "en_text": "to spot an owl too",
        "vi_text": "để phát hiện một con cú quá",
        "ipa": "/tɪ spɑt ən aʊl tu/"
      },
      {
        "id": 42,
        "startTime": 130.16,
        "endTime": 137.12,
        "en_text": "well good luck old chap may the best",
        "vi_text": "ồ chúc may mắn nhé chap cũ có thể là điều tốt nhất",
        "ipa": "/wɛl gʊd lək oʊld ʧæp meɪ ðə bɛst/"
      },
      {
        "id": 43,
        "startTime": 133.12,
        "endTime": 139.92,
        "en_text": "bert spotter win toodle pip bye",
        "vi_text": "bert Spotter giành chiến thắng toodle pip tạm biệt",
        "ipa": "/bərt ˈspɑtər wɪn toodle* pɪp baɪ/"
      },
      {
        "id": 44,
        "startTime": 137.12,
        "endTime": 142.4,
        "en_text": "grandpa pig",
        "vi_text": "ông nội lợn",
        "ipa": "/ˈgrændˌpɑ pɪg/"
      },
      {
        "id": 45,
        "startTime": 139.92,
        "endTime": 145.6,
        "en_text": "let's try out our hiding place",
        "vi_text": "hãy thử nơi ẩn náu của chúng ta",
        "ipa": "/lɛts traɪ aʊt ɑr ˈhaɪdɪŋ pleɪs/"
      },
      {
        "id": 46,
        "startTime": 142.4,
        "endTime": 145.6,
        "en_text": "on granny",
        "vi_text": "về bà ngoại",
        "ipa": "/ɔn ˈgræni/"
      },
      {
        "id": 47,
        "startTime": 146.08,
        "endTime": 152.08,
        "en_text": "peppa george grandpa hello granny we're",
        "vi_text": "peppa george ông nội xin chào bà chúng ta là",
        "ipa": "/peppa* ʤɔrʤ ˈgrændˌpɑ hɛˈloʊ ˈgræni wɪr/"
      },
      {
        "id": 48,
        "startTime": 150.88,
        "endTime": 155.28,
        "en_text": "here",
        "vi_text": "đây",
        "ipa": "/hir/"
      },
      {
        "id": 49,
        "startTime": 152.08,
        "endTime": 159.36,
        "en_text": "where we are hiding",
        "vi_text": "chúng ta đang trốn ở đâu",
        "ipa": "/wɛr wi ər ˈhaɪdɪŋ/"
      },
      {
        "id": 50,
        "startTime": 155.28,
        "endTime": 163.28,
        "en_text": "are you over here you're getting colder",
        "vi_text": "bạn có ở đây không, bạn đang thấy lạnh hơn",
        "ipa": "/ər ju ˈoʊvər hir jʊr ˈgɪtɪŋ ˈkoʊldər/"
      },
      {
        "id": 51,
        "startTime": 159.36,
        "endTime": 166.0,
        "en_text": "but i can't see you anywhere here we are",
        "vi_text": "nhưng tôi không thể thấy bạn ở đâu cả, chúng ta đang ở đây",
        "ipa": "/bət aɪ kænt si ju ˈɛniˌwɛr hir wi ər/"
      },
      {
        "id": 52,
        "startTime": 163.28,
        "endTime": 169.44,
        "en_text": "oh my goodness that is a good hiding",
        "vi_text": "ôi chúa ơi đó là một nơi ẩn náu tốt",
        "ipa": "/oʊ maɪ ˈgʊdnɪs ðət ɪz ə gʊd ˈhaɪdɪŋ/"
      },
      {
        "id": 53,
        "startTime": 166.0,
        "endTime": 173.68,
        "en_text": "place oh yes pepper and george are",
        "vi_text": "ồ đúng rồi Pepper và George đang ở đây",
        "ipa": "/pleɪs oʊ jɛs ˈpɛpər ənd ʤɔrʤ ər/"
      },
      {
        "id": 54,
        "startTime": 169.44,
        "endTime": 174.56,
        "en_text": "helping me get ready to spot an owl i",
        "vi_text": "giúp tôi sẵn sàng phát hiện một con cú, tôi",
        "ipa": "/ˈhɛlpɪŋ mi gɪt ˈrɛdi tɪ spɑt ən aʊl aɪ/"
      },
      {
        "id": 55,
        "startTime": 173.68,
        "endTime": 175.84,
        "en_text": "see",
        "vi_text": "nhìn thấy",
        "ipa": "/si/"
      },
      {
        "id": 56,
        "startTime": 174.56,
        "endTime": 179.28,
        "en_text": "okay",
        "vi_text": "được rồi",
        "ipa": "/ˌoʊˈkeɪ/"
      },
      {
        "id": 57,
        "startTime": 175.84,
        "endTime": 185.2,
        "en_text": "time to spot an owl",
        "vi_text": "đã đến lúc nhận ra một con cú",
        "ipa": "/taɪm tɪ spɑt ən aʊl/"
      },
      {
        "id": 58,
        "startTime": 179.28,
        "endTime": 185.2,
        "en_text": "now a boy owl makes a sound like this",
        "vi_text": "bây giờ một cậu bé cú phát ra âm thanh như thế này",
        "ipa": "/naʊ ə bɔɪ aʊl meɪks ə saʊnd laɪk ðɪs/"
      },
      {
        "id": 59,
        "startTime": 185.92,
        "endTime": 192.07,
        "en_text": "hopefully a girl owl will hear my call",
        "vi_text": "hy vọng một cô cú sẽ nghe thấy tiếng gọi của tôi",
        "ipa": "/ˈhoʊpfəli ə gərl aʊl wɪl hir maɪ kɔl/"
      },
      {
        "id": 60,
        "startTime": 189.76,
        "endTime": 195.33,
        "en_text": "and answer back",
        "vi_text": "và trả lời lại",
        "ipa": "/ənd ˈænsər bæk/"
      },
      {
        "id": 61,
        "startTime": 192.07,
        "endTime": 195.33,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 62,
        "startTime": 195.68,
        "endTime": 199.04,
        "en_text": "grandpa do",
        "vi_text": "ông nội làm",
        "ipa": "/ˈgrændˌpɑ du/"
      },
      {
        "id": 63,
        "startTime": 203.88,
        "endTime": 206.96,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 64,
        "startTime": 211.12,
        "endTime": 217.52,
        "en_text": "this girl owl sounds like she's getting",
        "vi_text": "cô gái cú này có vẻ như đang nhận được",
        "ipa": "/ðɪs gərl aʊl saʊnz laɪk ʃiz ˈgɪtɪŋ/"
      },
      {
        "id": 65,
        "startTime": 213.44,
        "endTime": 219.92,
        "en_text": "closer yes she wants to meet me the boy",
        "vi_text": "gần hơn đúng, cô ấy muốn gặp tôi, chàng trai",
        "ipa": "/ˈkloʊzər jɛs ʃi wɔnts tɪ mit mi ðə bɔɪ/"
      },
      {
        "id": 66,
        "startTime": 217.52,
        "endTime": 219.92,
        "en_text": "owl",
        "vi_text": "con cú",
        "ipa": "/aʊl/"
      },
      {
        "id": 67,
        "startTime": 222.64,
        "endTime": 225.64,
        "en_text": "oh",
        "vi_text": "Ồ",
        "ipa": "/oʊ/"
      },
      {
        "id": 68,
        "startTime": 226.0,
        "endTime": 232.8,
        "en_text": "it was just you and me doing owl calls",
        "vi_text": "chỉ có bạn và tôi đang gọi cú",
        "ipa": "/ɪt wɑz ʤɪst ju ənd mi duɪŋ aʊl kɔlz/"
      },
      {
        "id": 69,
        "startTime": 230.0,
        "endTime": 235.6,
        "en_text": "i thought you were a boy owl and i",
        "vi_text": "tôi tưởng bạn là một cậu bé cú và tôi",
        "ipa": "/aɪ θɔt ju wər ə bɔɪ aʊl ənd aɪ/"
      },
      {
        "id": 70,
        "startTime": 232.8,
        "endTime": 237.12,
        "en_text": "thought you were a girl owl yes well",
        "vi_text": "nghĩ bạn là một cô gái cú vâng vâng",
        "ipa": "/θɔt ju wər ə gərl aʊl jɛs wɛl/"
      },
      {
        "id": 71,
        "startTime": 235.6,
        "endTime": 239.2,
        "en_text": "moving quickly on",
        "vi_text": "di chuyển nhanh chóng trên",
        "ipa": "/ˈmuvɪŋ kˈwɪkli ɔn/"
      },
      {
        "id": 72,
        "startTime": 237.12,
        "endTime": 241.92,
        "en_text": "maybe there's another way to spot a real",
        "vi_text": "có lẽ có một cách khác để phát hiện sự thật",
        "ipa": "/ˈmeɪbi ðɛrz əˈnəðər weɪ tɪ spɑt ə ril/"
      },
      {
        "id": 73,
        "startTime": 239.2,
        "endTime": 246.24,
        "en_text": "owl like what you said that owls are",
        "vi_text": "cú giống như những gì bạn đã nói rằng cú là",
        "ipa": "/aʊl laɪk wət ju sɛd ðət aʊlz ər/"
      },
      {
        "id": 74,
        "startTime": 241.92,
        "endTime": 248.8,
        "en_text": "very shy yes well maybe all this calling",
        "vi_text": "rất nhút nhát vâng, có lẽ tất cả những lời kêu gọi này",
        "ipa": "/ˈvɛri ʃaɪ jɛs wɛl ˈmeɪbi ɔl ðɪs ˈkɔlɪŋ/"
      },
      {
        "id": 75,
        "startTime": 246.24,
        "endTime": 252.24,
        "en_text": "is scaring the owls away let's hide",
        "vi_text": "đang làm lũ cú sợ hãi, hãy trốn đi nào",
        "ipa": "/ɪz ˈskɛrɪŋ ðə aʊlz əˈweɪ lɛts haɪd/"
      },
      {
        "id": 76,
        "startTime": 248.8,
        "endTime": 257.04,
        "en_text": "again but be very quiet",
        "vi_text": "một lần nữa nhưng hãy thật im lặng",
        "ipa": "/əˈgɛn bət bi ˈvɛri kwaɪət/"
      },
      {
        "id": 77,
        "startTime": 252.24,
        "endTime": 257.04,
        "en_text": "brilliant i suppose it's worth a go",
        "vi_text": "tuyệt vời tôi cho rằng nó đáng để thử",
        "ipa": "/ˈbrɪljənt aɪ səˈpoʊz ɪts wərθ ə goʊ/"
      },
      {
        "id": 78,
        "startTime": 258.24,
        "endTime": 263.12,
        "en_text": "i heard something",
        "vi_text": "tôi đã nghe thấy điều gì đó",
        "ipa": "/aɪ hərd ˈsəmθɪŋ/"
      },
      {
        "id": 79,
        "startTime": 261.52,
        "endTime": 266.32,
        "en_text": "look",
        "vi_text": "Nhìn",
        "ipa": "/lʊk/"
      },
      {
        "id": 80,
        "startTime": 263.12,
        "endTime": 270.08,
        "en_text": "it is a real owl",
        "vi_text": "nó là một con cú thật",
        "ipa": "/ɪt ɪz ə ril aʊl/"
      },
      {
        "id": 81,
        "startTime": 266.32,
        "endTime": 272.64,
        "en_text": "now i've spotted an owl i could take it",
        "vi_text": "bây giờ tôi đã phát hiện ra một con cú và tôi có thể bắt nó",
        "ipa": "/naʊ aɪv ˈspɑtɪd ən aʊl aɪ kʊd teɪk ɪt/"
      },
      {
        "id": 82,
        "startTime": 270.08,
        "endTime": 276.56,
        "en_text": "off in my book",
        "vi_text": "tắt trong cuốn sách của tôi",
        "ipa": "/ɔf ɪn maɪ bʊk/"
      },
      {
        "id": 83,
        "startTime": 272.64,
        "endTime": 277.84,
        "en_text": "and me and me",
        "vi_text": "và tôi và tôi",
        "ipa": "/ənd mi ənd mi/"
      },
      {
        "id": 84,
        "startTime": 276.56,
        "endTime": 281.96,
        "en_text": "wow",
        "vi_text": "Ồ",
        "ipa": "/waʊ/"
      },
      {
        "id": 85,
        "startTime": 277.84,
        "endTime": 281.96,
        "en_text": "owls are the best",
        "vi_text": "cú là tuyệt nhất",
        "ipa": "/aʊlz ər ðə bɛst/"
      },
      {
        "id": 86,
        "startTime": 282.32,
        "endTime": 286.76,
        "en_text": "everyone loves owls",
        "vi_text": "mọi người đều yêu thích cú",
        "ipa": "/ˈɛvriˌwən ləvz aʊlz/"
      },
      {
        "id": 87,
        "startTime": 287.55,
        "endTime": 303.42,
        "en_text": "[Music]",
        "vi_text": "[Âm nhạc]",
        "ipa": "/[mˈjuzɪk]/"
      },
      {
        "id": 88,
        "startTime": 311.76,
        "endTime": 313.84,
        "en_text": "you",
        "vi_text": "Bạn",
        "ipa": "/ju/"
      }
    ]
  }
]
  },
  {
    id: "s2",
    title: "TED-Ed",
    description:
      "Các video khoa học, kiến thức thú vị từ TED-Ed. Tốc độ nói nhanh, từ vựng phong phú.",
    thumbnailUrl: "https://i.ytimg.com/vi/HDt_rTPPh70/maxresdefault.jpg",
    avatarUrl: "https://i.ytimg.com/vi/HDt_rTPPh70/default.jpg",
    level: "Khó",
    episodes: [
      {
        id: "e3",
        title: "Tập 3: Mèo và Muỗi (TED-Ed)",
        youtubeId: "HDt_rTPPh70",
        subtitles: [
          {
            id: 1,
            startTime: 6.96,
            endTime: 10.3,
            en_text: "Of the many bewildering behaviors cats display,",
            vi_text:
              "Trong số rất nhiều hành vi gây hoang mang mà mèo thể hiện,",
            ipa: "/əv ðə ˈmɛni bɪˈwɪldərɪŋ bɪˈheɪvjərz kæts dɪˈspleɪ,/",
          },
          {
            id: 2,
            startTime: 10.38,
            endTime: 15.34,
            en_text:
              "one of the strangest is their obsession with a specific species of plant.",
            vi_text:
              "một trong những điều kỳ lạ nhất là nỗi ám ảnh của họ đối với một loài thực vật cụ thể.",
            ipa: "/wən əv ðə ˈstreɪnʤɪst ɪz ðɛr əbˈsɛʃən wɪθ ə spɪˈsɪfɪk ˈspiʃiz əv plænt./",
          },
          {
            id: 3,
            startTime: 15.93,
            endTime: 19.6,
            en_text: "After just one whiff, even the most stoic cat",
            vi_text:
              "Chỉ sau một cú đánh, ngay cả con mèo kiên cường nhất cũng vậy",
            ipa: "/ˈæftər ʤɪst wən wɪf, ˈivɪn ðə moʊst stoʊɪk kæt/",
          },
          {
            id: 4,
            startTime: 19.64,
            endTime: 23.02,
            en_text: "can start pawing, drooling, biting, and wriggling",
            vi_text: "có thể bắt đầu vồ, chảy nước dãi, cắn và quằn quại",
            ipa: "/kən stɑrt pɔɪŋ, ˈdrulɪŋ, ˈbaɪtɪŋ, ənd wriggling*/",
          },
          {
            id: 5,
            startTime: 23.02,
            endTime: 26.31,
            en_text: "in a state of pure feline euphoria.",
            vi_text: "trong trạng thái hưng phấn thuần khiết của mèo.",
            ipa: "/ɪn ə steɪt əv pjʊr ˈfiˌlaɪn juˈfɔriə./",
          },
          {
            id: 6,
            startTime: 27.23,
            endTime: 30.36,
            en_text: "So, why do cats go crazy for catnip?",
            vi_text: "Vậy tại sao mèo lại phát cuồng vì catnip?",
            ipa: "/soʊ, waɪ du kæts goʊ ˈkreɪzi fər ˈkætnɪp?/",
          },
          {
            id: 7,
            startTime: 31.57,
            endTime: 36.07,
            en_text: "This is the question cat behavior expert Masao Miyazaki",
            vi_text:
              "Đây là câu hỏi của chuyên gia về hành vi của mèo Masao Miyazaki",
            ipa: "/ðɪs ɪz ðə kˈwɛʃən kæt bɪˈheɪvjər ˈɛkspərt mɑˈsɑˌoʊ ˌmijɑˈzɑki/",
          },
          {
            id: 8,
            startTime: 36.07,
            endTime: 41.45,
            en_text: "and chemist Toshio Nishikawa set out to answer in 2013.",
            vi_text:
              "và nhà hóa học Toshio Nishikawa đã đặt ra câu trả lời vào năm 2013.",
            ipa: "/ənd ˈkɛmɪst toʊˈʃioʊ niʃiˈkɑwə sɛt aʊt tɪ ˈænsər ɪn 2013/",
          },
          {
            id: 9,
            startTime: 41.91,
            endTime: 46.08,
            en_text:
              "Along with their research teams from Iwate and Nagoya University,",
            vi_text:
              "Cùng với nhóm nghiên cứu của họ từ Đại học Iwate và Nagoya,",
            ipa: "/əˈlɔŋ wɪθ ðɛr ˈrisərʧ timz frəm aɪˈweɪt ənd nəˈgɔɪə ˌjunəˈvərsəti,/",
          },
          {
            id: 10,
            startTime: 46.08,
            endTime: 48.59,
            en_text: "they began by studying silvervine—",
            vi_text: "họ bắt đầu bằng việc nghiên cứu Silvervine—",
            ipa: "/ðeɪ bɪˈgæn baɪ ˈstədiɪŋ silvervine—*—/",
          },
          {
            id: 11,
            startTime: 48.75,
            endTime: 52.05,
            en_text: "a plant that sparks a similar response to catnip.",
            vi_text: "một loại cây gây ra phản ứng tương tự như catnip.",
            ipa: "/ə plænt ðət spɑrks ə ˈsɪmələr rɪˈspɑns tɪ ˈkætnɪp./",
          },
          {
            id: 12,
            startTime: 52.84,
            endTime: 56.89,
            en_text:
              "First, the researchers painstakingly extracted chemical compounds",
            vi_text:
              "Đầu tiên, các nhà nghiên cứu đã tỉ mỉ chiết xuất các hợp chất hóa học",
            ipa: "/fərst, ðə ˈrisərʧərz ˈpeɪnˌsteɪkɪŋli ɛkˈstræktɪd ˈkɛmɪkəl ˈkɑmpaʊndz/",
          },
          {
            id: 13,
            startTime: 56.89,
            endTime: 58.01,
            en_text: "from the plant",
            vi_text: "từ nhà máy",
            ipa: "/frəm ðə plænt/",
          },
          {
            id: 14,
            startTime: 58.01,
            endTime: 62.02,
            en_text:
              "and dribbled various combinations of them onto filter papers.",
            vi_text:
              "và nhỏ giọt nhiều sự kết hợp khác nhau của chúng lên giấy lọc.",
            ipa: "/ənd ˈdrɪbəld ˈvɛriəs ˌkɑmbəˈneɪʃənz əv ðɛm ˈɔntu ˈfɪltər ˈpeɪpərz./",
          },
          {
            id: 15,
            startTime: 62.43,
            endTime: 66.94,
            en_text:
              "Then they brought in some cats and studied which compounds they were drawn to.",
            vi_text:
              "Sau đó, họ mang theo một số con mèo và nghiên cứu xem chúng bị thu hút bởi những hợp chất nào.",
            ipa: "/ðɛn ðeɪ brɔt ɪn səm kæts ənd ˈstədid wɪʧ ˈkɑmpaʊndz ðeɪ wər drɔn tɪ./",
          },
          {
            id: 16,
            startTime: 67.52,
            endTime: 71.65,
            en_text:
              "Overwhelmingly, their feline testers pounced on the papers",
            vi_text:
              "Quá choáng ngợp, những người thử nghiệm mèo của họ đã lao vào giấy tờ",
            ipa: "/ˌoʊvərˈwɛlmɪŋli, ðɛr ˈfiˌlaɪn ˈtɛstərz paʊnst ɔn ðə ˈpeɪpərz/",
          },
          {
            id: 17,
            startTime: 71.65,
            endTime: 73.65,
            en_text: "containing nepetalactol.",
            vi_text: "chứa nepetactol.",
            ipa: "/kənˈteɪnɪŋ nepetalactol*./",
          },
          {
            id: 18,
            startTime: 73.9,
            endTime: 77.2,
            en_text: "And when Miyazaki and his student Reiko Uenoyama",
            vi_text: "Và khi Miyazaki và học trò Reiko Uenoyama của ông",
            ipa: "/ənd wɪn ˌmijɑˈzɑki ənd hɪz ˈstudənt reiko* uenoyama*/",
          },
          {
            id: 19,
            startTime: 77.2,
            endTime: 81.16,
            en_text:
              "ran blood tests on the cats who’d interacted with nepetalactol,",
            vi_text:
              "tiến hành xét nghiệm máu trên những con mèo đã tương tác với nepetalactol,",
            ipa: "/ræn bləd tɛsts ɔn ðə kæts who’d* ˌɪnərˈæktəd wɪθ nepetalactol*,/",
          },
          {
            id: 20,
            startTime: 81.16,
            endTime: 84.96,
            en_text: "they found their systems were flooded with endorphins.",
            vi_text: "họ nhận thấy hệ thống của họ tràn ngập endorphin.",
            ipa: "/ðeɪ faʊnd ðɛr ˈsɪstəmz wər ˈflədɪd wɪθ ɛnˈdɔrfɪnz./",
          },
          {
            id: 21,
            startTime: 85.12,
            endTime: 88.38,
            en_text: "These hormones block pain signals, relieve stress,",
            vi_text: "Những hormone này chặn tín hiệu đau, giảm căng thẳng,",
            ipa: "/ðiz ˈhɔrˌmoʊnz blɑk peɪn ˈsɪgnəlz, rɪˈliv strɛs,/",
          },
          {
            id: 22,
            startTime: 88.38,
            endTime: 91.46,
            en_text: "and generally create a happy, calming effect.",
            vi_text: "và nhìn chung tạo ra hiệu ứng vui vẻ, êm dịu.",
            ipa: "/ənd ˈʤɛnərəli kriˈeɪt ə ˈhæpi, ˈkɑmɪŋ ˈifɛkt./",
          },
          {
            id: 23,
            startTime: 91.67,
            endTime: 94.59,
            en_text: "And catnip triggers the same endorphin rush",
            vi_text: "Và catnip kích hoạt cơn sốt endorphin tương tự",
            ipa: "/ənd ˈkætnɪp ˈtrɪgərz ðə seɪm ɛnˈdɔrfɪn rəʃ/",
          },
          {
            id: 24,
            startTime: 94.59,
            endTime: 97.55,
            en_text: "with a similar chemical called nepetalactone,",
            vi_text: "với một chất hóa học tương tự gọi là nepetactone,",
            ipa: "/wɪθ ə ˈsɪmələr ˈkɛmɪkəl kɔld nepetalactone*,/",
          },
          {
            id: 25,
            startTime: 98.05,
            endTime: 103.35,
            en_text:
              "and it’s this flood of happy hormones that gives catnip and silvervine",
            vi_text:
              "và chính dòng hormone hạnh phúc này đã tạo nên catnip và silvervine",
            ipa: "/ənd it’s* ðɪs fləd əv ˈhæpi ˈhɔrˌmoʊnz ðət gɪvz ˈkætnɪp ənd silvervine*/",
          },
          {
            id: 26,
            startTime: 103.35,
            endTime: 106.19,
            en_text: "their signature drug-like response.",
            vi_text: "phản ứng giống như thuốc đặc trưng của họ.",
            ipa: "/ðɛr ˈsɪgnəʧər drug-like* rɪˈspɑns./",
          },
          {
            id: 27,
            startTime: 107.23,
            endTime: 110.69,
            en_text:
              "These compounds don't just trigger this effect in small cats.",
            vi_text:
              "Những hợp chất này không chỉ gây ra tác dụng này ở mèo nhỏ.",
            ipa: "/ðiz ˈkɑmpaʊndz doʊnt ʤɪst ˈtrɪgər ðɪs ˈifɛkt ɪn smɔl kæts./",
          },
          {
            id: 28,
            startTime: 110.98,
            endTime: 114.48,
            en_text:
              "When the researchers brought nepetalactol-treated filter papers",
            vi_text:
              "Khi các nhà nghiên cứu mang giấy lọc được xử lý bằng nepetalactol đến",
            ipa: "/wɪn ðə ˈrisərʧərz brɔt nepetalactol-treated* ˈfɪltər ˈpeɪpərz/",
          },
          {
            id: 29,
            startTime: 114.48,
            endTime: 115.82,
            en_text: "to a few zoos,",
            vi_text: "tới một vài sở thú,",
            ipa: "/tɪ ə fju zuz,/",
          },
          {
            id: 30,
            startTime: 115.82,
            endTime: 121.03,
            en_text:
              "leopards, lynxes, and jaguars all dove face first into the compound.",
            vi_text:
              "báo hoa mai, linh miêu và báo đốm Mỹ đều lao vào khu nhà đầu tiên.",
            ipa: "/ˈlɛpərdz, ˈlɪŋksɪz, ənd ˈʤægˌwɑrz ɔl dəv feɪs fərst ˈɪntu ðə ˈkɑmpaʊnd./",
          },
          {
            id: 31,
            startTime: 121.45,
            endTime: 123.12,
            en_text: "This was big news.",
            vi_text: "Đây là một tin tức lớn.",
            ipa: "/ðɪs wɑz bɪg nuz./",
          },
          {
            id: 32,
            startTime: 123.24,
            endTime: 127.83,
            en_text:
              "If all these different cat species reacted to nepetalactol in the same way,",
            vi_text:
              "Nếu tất cả các loài mèo khác nhau đều phản ứng với nepetalactol theo cách giống nhau,",
            ipa: "/ɪf ɔl ðiz ˈdɪfərənt kæt ˈspiʃiz riˈæktɪd tɪ nepetalactol* ɪn ðə seɪm weɪ,/",
          },
          {
            id: 33,
            startTime: 128.04,
            endTime: 131.79,
            en_text:
              "the response was very likely a shared evolutionary trait—",
            vi_text: "phản ứng rất có thể là một đặc điểm tiến hóa chung—",
            ipa: "/ðə rɪˈspɑns wɑz ˈvɛri ˈlaɪkli ə ʃɛrd ˌɛvəˈluʃəˌnɛri trait—*—/",
          },
          {
            id: 34,
            startTime: 132.0,
            endTime: 134.63,
            en_text: "potentially something important to cat survival",
            vi_text:
              "có khả năng là thứ gì đó quan trọng đối với sự sống còn của mèo",
            ipa: "/pəˈtɛnʃəli ˈsəmθɪŋ ˌɪmˈpɔrtənt tɪ kæt sərˈvaɪvəl/",
          },
          {
            id: 35,
            startTime: 134.63,
            endTime: 137.38,
            en_text: "that stretched back millions of years.",
            vi_text: "đã kéo dài hàng triệu năm.",
            ipa: "/ðət strɛʧt bæk ˈmɪljənz əv jɪrz./",
          },
          {
            id: 36,
            startTime: 138.05,
            endTime: 141.43,
            en_text:
              "When the silvervine researchers presented their work at a conference,",
            vi_text:
              "Khi các nhà nghiên cứu Silvervine trình bày công trình của họ tại một hội nghị,",
            ipa: "/wɪn ðə silvervine* ˈrisərʧərz pərˈzɛnəd ðɛr wərk æt ə ˈkɑnfərəns,/",
          },
          {
            id: 37,
            startTime: 141.43,
            endTime: 144.89,
            en_text: "one evolutionary biologist raised a compelling theory.",
            vi_text:
              "một nhà sinh vật học tiến hóa đã đưa ra một lý thuyết thuyết phục.",
            ipa: "/wən ˌɛvəˈluʃəˌnɛri baɪˈɑləʤɪst reɪzd ə kəmˈpɛlɪŋ ˈθɪri./",
          },
          {
            id: 38,
            startTime: 145.39,
            endTime: 146.52,
            en_text: "In chemical terms,",
            vi_text: "Về mặt hóa học,",
            ipa: "/ɪn ˈkɛmɪkəl tərmz,/",
          },
          {
            id: 39,
            startTime: 146.52,
            endTime: 152.48,
            en_text:
              "both nepetalactol and nepetalactone are classified as an iridoid—",
            vi_text:
              "cả nepetalactol và nepetalactone đều được phân loại là iridoid—",
            ipa: "/boʊθ nepetalactol* ənd nepetalactone* ər ˈklæsəˌfaɪd ɛz ən iridoid—*—/",
          },
          {
            id: 40,
            startTime: 152.65,
            endTime: 157.11,
            en_text:
              "a type of natural compound known to contain insect-repelling properties.",
            vi_text:
              "một loại hợp chất tự nhiên được biết là có đặc tính xua đuổi côn trùng.",
            ipa: "/ə taɪp əv ˈnæʧərəl ˈkɑmpaʊnd noʊn tɪ kənˈteɪn insect-repelling* ˈprɑpərtiz./",
          },
          {
            id: 41,
            startTime: 157.32,
            endTime: 161.53,
            en_text:
              "So perhaps cats rubbing their faces in silvervine and catnip",
            vi_text:
              "Vậy có lẽ mèo đang xoa mặt chúng bằng cây bạc hà và cỏ mèo",
            ipa: "/soʊ pərˈhæps kæts ˈrəbɪŋ ðɛr ˈfeɪsɪz ɪn silvervine* ənd ˈkætnɪp/",
          },
          {
            id: 42,
            startTime: 161.62,
            endTime: 164.87,
            en_text: "were applying an ancient form of bug spray.",
            vi_text: "đang áp dụng một hình thức xịt côn trùng cổ xưa.",
            ipa: "/wər əˈplaɪɪŋ ən ˈeɪnʧənt fɔrm əv bəg spreɪ./",
          },
          {
            id: 43,
            startTime: 165.12,
            endTime: 168.54,
            en_text: "To test this, researchers set up cages of mosquitoes",
            vi_text:
              "Để kiểm tra điều này, các nhà nghiên cứu đã dựng lồng muỗi",
            ipa: "/tɪ tɛst ðɪs, ˈrisərʧərz sɛt əp ˈkeɪʤɪz əv məˈskitoʊz/",
          },
          {
            id: 44,
            startTime: 168.54,
            endTime: 170.75,
            en_text: "that cats could stick their heads into.",
            vi_text: "mà mèo có thể thò đầu vào.",
            ipa: "/ðət kæts kʊd stɪk ðɛr hɛdz ˈɪntu./",
          },
          {
            id: 45,
            startTime: 170.92,
            endTime: 174.38,
            en_text:
              "And sure enough, the cats that had been treated with nepetalactol",
            vi_text:
              "Và chắc chắn, những con mèo được điều trị bằng nepetalactol",
            ipa: "/ənd ʃʊr ɪˈnəf, ðə kæts ðət hæd bɪn ˈtritɪd wɪθ nepetalactol*/",
          },
          {
            id: 46,
            startTime: 174.38,
            endTime: 178.01,
            en_text:
              "got fewer mosquito bites than the cats in the control group.",
            vi_text: "bị muỗi đốt ít hơn những con mèo trong nhóm đối chứng.",
            ipa: "/gɑt fjuər məˈskitoʊ baɪts ðən ðə kæts ɪn ðə kənˈtroʊl grup./",
          },
          {
            id: 47,
            startTime: 178.26,
            endTime: 182.39,
            en_text:
              "The same effect was true for the scientists who’d volunteered their arms",
            vi_text:
              "Hiệu ứng tương tự cũng xảy ra với các nhà khoa học đã tình nguyện tham gia",
            ipa: "/ðə seɪm ˈifɛkt wɑz tru fər ðə ˈsaɪəntɪsts who’d* ˌvɑlənˈtɪrd ðɛr ɑrmz/",
          },
          {
            id: 48,
            startTime: 182.39,
            endTime: 185.39,
            en_text: "in solidarity with their feline subjects.",
            vi_text: "đoàn kết với các đối tượng mèo của họ.",
            ipa: "/ɪn ˌsɑləˈdɛrəti wɪθ ðɛr ˈfiˌlaɪn ˈsəbʤɪkts./",
          },
          {
            id: 49,
            startTime: 185.64,
            endTime: 190.23,
            en_text:
              "These mosquito-repelling properties are currently our best explanation",
            vi_text:
              "Những đặc tính đuổi muỗi này hiện là lời giải thích tốt nhất của chúng tôi",
            ipa: "/ðiz mosquito-repelling* ˈprɑpərtiz ər ˈkərəntli ɑr bɛst ˌɛkspləˈneɪʃən/",
          },
          {
            id: 50,
            startTime: 190.23,
            endTime: 193.15,
            en_text: "for why cats love silvervine and catnip.",
            vi_text: "vì sao mèo lại thích silvervine và catnip.",
            ipa: "/fər waɪ kæts ləv silvervine* ənd ˈkætnɪp./",
          },
          {
            id: 51,
            startTime: 193.27,
            endTime: 196.36,
            en_text: "But researchers still had one more question:",
            vi_text: "Nhưng các nhà nghiên cứu vẫn còn một câu hỏi nữa:",
            ipa: "/bət ˈrisərʧərz stɪl hæd wən mɔr kˈwɛʃən:/",
          },
          {
            id: 52,
            startTime: 196.86,
            endTime: 198.82,
            en_text: "in their state of euphoria,",
            vi_text: "trong trạng thái hưng phấn của họ,",
            ipa: "/ɪn ðɛr steɪt əv juˈfɔriə,/",
          },
          {
            id: 53,
            startTime: 198.82,
            endTime: 203.32,
            en_text:
              "cats tend to vigorously bite, lick, and rub against these plants.",
            vi_text:
              "mèo có xu hướng cắn, liếm và chà xát mạnh vào những cây này.",
            ipa: "/kæts tɛnd tɪ ˈvɪgərəsli baɪt, lɪk, ənd rəb əˈgɛnst ðiz plænts./",
          },
          {
            id: 54,
            startTime: 203.62,
            endTime: 208.16,
            en_text:
              "But do cats really need to go this crazy to get their bug repelling effects?",
            vi_text:
              "Nhưng mèo có thực sự cần phải phát điên như vậy để có được tác dụng đuổi côn trùng không?",
            ipa: "/bət du kæts ˈrɪli nid tɪ goʊ ðɪs ˈkreɪzi tɪ gɪt ðɛr bəg rəˈpɛlɪŋ ˈifɛkts?/",
          },
          {
            id: 55,
            startTime: 209.41,
            endTime: 212.83,
            en_text:
              "To investigate rubbing, they provided cats with filter papers",
            vi_text: "Để điều tra sự cọ xát, họ đã cung cấp cho mèo giấy lọc",
            ipa: "/tɪ ˌɪnˈvɛstəˌgeɪt ˈrəbɪŋ, ðeɪ prəˈvaɪdɪd kæts wɪθ ˈfɪltər ˈpeɪpərz/",
          },
          {
            id: 56,
            startTime: 212.83,
            endTime: 216.04,
            en_text: "treated with microscopic amounts of nepetalactol.",
            vi_text: "được xử lý bằng một lượng nhỏ nepetactol.",
            ipa: "/ˈtritɪd wɪθ ˌmaɪkrəˈskɑpɪk əˈmaʊnts əv nepetalactol*./",
          },
          {
            id: 57,
            startTime: 216.13,
            endTime: 221.01,
            en_text:
              "And sure enough, even these tiny doses made the papers irresistible,",
            vi_text:
              "Và chắc chắn rằng, ngay cả những liều lượng nhỏ bé này cũng khiến các tờ báo trở nên hấp dẫn không thể cưỡng lại được,",
            ipa: "/ənd ʃʊr ɪˈnəf, ˈivɪn ðiz ˈtaɪni ˈdoʊsɪz meɪd ðə ˈpeɪpərz ˌɪrɪˈzɪstəbəl,/",
          },
          {
            id: 58,
            startTime: 221.01,
            endTime: 225.14,
            en_text:
              "suggesting that microscopic amounts of bug repellent can be transferred",
            vi_text:
              "gợi ý rằng có thể chuyển một lượng cực nhỏ thuốc chống côn trùng",
            ipa: "/səˈʤɛstɪŋ ðət ˌmaɪkrəˈskɑpɪk əˈmaʊnts əv bəg rɪˈpɛlənt kən bi ˈtrænsfərd/",
          },
          {
            id: 59,
            startTime: 225.14,
            endTime: 226.64,
            en_text: "by rubbing alone.",
            vi_text: "bằng cách cọ xát một mình.",
            ipa: "/baɪ ˈrəbɪŋ əˈloʊn./",
          },
          {
            id: 60,
            startTime: 226.81,
            endTime: 231.64,
            en_text:
              "As for biting and licking, the researchers found that when cats damage the plant,",
            vi_text:
              "Về việc cắn và liếm, các nhà nghiên cứu phát hiện ra rằng khi mèo làm hỏng cây,",
            ipa: "/ɛz fər ˈbaɪtɪŋ ənd ˈlɪkɪŋ, ðə ˈrisərʧərz faʊnd ðət wɪn kæts ˈdæmɪʤ ðə plænt,/",
          },
          {
            id: 61,
            startTime: 231.69,
            endTime: 236.11,
            en_text:
              "the leaves actually produce more mosquito-repellent chemicals.",
            vi_text:
              "những chiếc lá thực sự tạo ra nhiều hóa chất đuổi muỗi hơn.",
            ipa: "/ðə livz ˈæˌkʧuəli ˈproʊdus mɔr mosquito-repellent* ˈkɛmɪkəlz./",
          },
          {
            id: 62,
            startTime: 236.23,
            endTime: 240.78,
            en_text:
              "So your cat isn’t just ripping open their bags of catnip to be annoying,",
            vi_text:
              "Vì vậy, con mèo của bạn không chỉ xé túi catnip của chúng để gây khó chịu,",
            ipa: "/soʊ jʊr kæt isn’t* ʤɪst ˈrɪpɪŋ ˈoʊpən ðɛr bægz əv ˈkætnɪp tɪ bi əˈnɔɪɪŋ,/",
          },
          {
            id: 63,
            startTime: 240.94,
            endTime: 244.66,
            en_text:
              "their evolutionary instincts are just trying to get even more",
            vi_text:
              "bản năng tiến hóa của họ chỉ đang cố gắng để có được nhiều hơn nữa",
            ipa: "/ðɛr ˌɛvəˈluʃəˌnɛri ˈɪnstɪŋkts ər ʤɪst traɪɪŋ tɪ gɪt ˈivɪn mɔr/",
          },
          {
            id: 64,
            startTime: 244.66,
            endTime: 246.66,
            en_text: "of that bug protection.",
            vi_text: "về việc bảo vệ lỗi đó.",
            ipa: "/əv ðət bəg prəˈtɛkʃən./",
          },
          {
            id: 65,
            startTime: 247.24,
            endTime: 251.91,
            en_text:
              "Cats are far from the only animal to use natural plants for purposes like this.",
            vi_text:
              "Mèo không phải là loài động vật duy nhất sử dụng thực vật tự nhiên cho những mục đích như thế này.",
            ipa: "/kæts ər fɑr frəm ðə ˈoʊnli ˈænəməl tɪ juz ˈnæʧərəl plænts fər ˈpərpəsɪz laɪk ðɪs./",
          },
          {
            id: 66,
            startTime: 252.08,
            endTime: 256.96,
            en_text:
              "Apes swallow scratchy and hairy leaves to dislodge parasites from their guts.",
            vi_text:
              "Khỉ nuốt những chiếc lá có lông và sần sùi để đánh bật ký sinh trùng ra khỏi ruột.",
            ipa: "/eɪps sˈwɔloʊ ˈskræʧi ənd ˈhɛri livz tɪ dɪsˈlɑʤ ˈpɛrəˌsaɪts frəm ðɛr gəts./",
          },
          {
            id: 67,
            startTime: 257.17,
            endTime: 261.67,
            en_text:
              "Sheep munch on tannin-rich plants to kill intestinal worms,",
            vi_text: "Cừu nhai cây giàu tannin để diệt giun đường ruột,",
            ipa: "/ʃip mənʧ ɔn tannin-rich* plænts tɪ kɪl ˌɪnˈtɛstɪnəl wərmz,/",
          },
          {
            id: 68,
            startTime: 261.92,
            endTime: 265.09,
            en_text: "and monarch butterflies use toxic milkweed",
            vi_text: "và bướm chúa sử dụng bông tai độc hại",
            ipa: "/ənd ˈmɑˌnɑrk ˈbətərˌflaɪz juz ˈtɑksɪk ˈmɪlkˌwid/",
          },
          {
            id: 69,
            startTime: 265.09,
            endTime: 268.35,
            en_text: "to kill parasites that normally impair their flight.",
            vi_text:
              "để tiêu diệt những ký sinh trùng thường cản trở khả năng bay của chúng.",
            ipa: "/tɪ kɪl ˈpɛrəˌsaɪts ðət ˈnɔrməli ˌɪmˈpɛr ðɛr flaɪt./",
          },
          {
            id: 70,
            startTime: 268.93,
            endTime: 272.02,
            en_text: "Just like cats’ ability to find mosquito repellent,",
            vi_text: "Giống như khả năng tìm thuốc đuổi muỗi của mèo,",
            ipa: "/ʤɪst laɪk cats’*’ əˈbɪləˌti tɪ faɪnd məˈskitoʊ rɪˈpɛlənt,/",
          },
          {
            id: 71,
            startTime: 272.1,
            endTime: 276.19,
            en_text:
              "these behaviors can help humans identify useful plants and ingredients",
            vi_text:
              "những hành vi này có thể giúp con người xác định các loại thực vật và thành phần hữu ích",
            ipa: "/ðiz bɪˈheɪvjərz kən hɛlp ˈjumənz aɪˈdɛntəˌfaɪ ˈjusfəl plænts ənd ˌɪnˈgridiənts/",
          },
          {
            id: 72,
            startTime: 276.19,
            endTime: 277.65,
            en_text: "in the natural world.",
            vi_text: "trong thế giới tự nhiên.",
            ipa: "/ɪn ðə ˈnæʧərəl wərld./",
          },
          {
            id: 73,
            startTime: 277.98,
            endTime: 281.61,
            en_text:
              "So, the next time you see your feline friend on catnip binge,",
            vi_text:
              "Vì vậy, lần tới khi bạn nhìn thấy người bạn mèo của mình say sưa thưởng thức catnip,",
            ipa: "/soʊ, ðə nɛkst taɪm ju si jʊr ˈfiˌlaɪn frɛnd ɔn ˈkætnɪp bɪnʤ,/",
          },
          {
            id: 74,
            startTime: 281.69,
            endTime: 284.24,
            en_text: "don’t worry— it’s only medicinal.",
            vi_text: "đừng lo lắng—nó chỉ có tác dụng chữa bệnh thôi.",
            ipa: "/don’t* worry—*— it’s* ˈoʊnli məˈdɪsənəl./",
          },
        ],
      },
    ],
  },
];

export const MOCK_DICT: Record<string, any> = {
  student: {
    ipa: "/ˈstjuː.dənt/",
    vi: "sinh viên",
    en: "A person who studies or learns about a particular subject.",
  },
  welcome: {
    ipa: "/ˈwɛlkəm/",
    vi: "chào mừng",
    en: "An instance or manner of greeting someone.",
  },
  news: {
    ipa: "/njuːz/",
    vi: "tin tức",
    en: "Newly received or noteworthy information.",
  },
  great: {
    ipa: "/greɪt/",
    vi: "tuyệt vời",
    en: "Of an extent, amount, or intensity considerably above the normal or average.",
  },
};
