import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import Confetti from "react-confetti";
import { Heart, Play } from "lucide-react";
import { RomanticButton } from "@/components/ui/romantic-button";
import { useToast } from "@/hooks/use-toast";

type Section = "welcome" | "quiz" | "result" | "video";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  { id: 1, question: "Sana aldığım ilk hediye neydi?", 
    options: ["Kar Küresi", "Bilezik", "Çikolatalı Süt", "Kupa"], correctAnswer: 2 },
  { id: 2, question: "En çok birlikte gitmeyi sevdiğimiz yer neresi?", 
    options: ["Sahil", "Sinema", "Park", "Kafe"], correctAnswer: 0 },
  { id: 3, question: "Bir evrende olmak isteseydim, o evrenin adı ne olurdu?", 
    options: ["Planet-34", "Or3tega-99", "Oasis", "Oasar"], correctAnswer: 2 },
  { id: 4, question: "Kaç aydır sevgiliyiz?", 
    options: ["60", "58", "45", "72"], correctAnswer: 0 },
  { id: 5, question: '"Seni seviyorum"u ilk kim söyledi? 😄', 
    options: ["Sen", "Ben", "İkimiz aynı anda", "Hatırlamıyorum"], correctAnswer: 3 },
  { id: 6, question: "İlk yakınlaştığımız zaman ne zamandı?", 
    options: ["Okulda Çatıda", "2. ayımızda", "Okulda Çardakta", "Çiğ Köftecide"], correctAnswer: 2 },
  { id: 7, question: "Birlikte izlediğimiz son film hangisiydi?", 
    options: ["Moana 2 ", "Spiderman Eve Dönüş", "Asteriks ve Oburiks", "Lohusa"], correctAnswer: 3 },
  { id: 8, question: "En çok hangi konuda tartışırız?", 
    options: ["Ne yiyeceğimiz", "Kıskanmak", "Uyku saati", "Mesajlara geç dönmek"], correctAnswer: 1 },
  { id: 9, question: "Beni en çok ne güldürür?", 
    options: ["Saçma şakalar", "Yüz ifaden", "Yanlış söylediğin kelimeler", "Yaptığın espiriler"], correctAnswer: 1 },
  { id: 10, question: "Bana aldığın ilk kıyafet neydi?", 
    options: ["Siyah Yakalı Kazak", "Kot ceket", "Gömlek", "Sweatshirt"], correctAnswer: 0 },
  { id: 11, question: "Birlikte en çok yaptığımız şey ne?", 
    options: ["Yemek yemek", "Film izlemek", "Beraber yürümek", "Sohbet etmek"], correctAnswer: 2 },
  { id: 12, question: "Bana en çok hangi lakabı takıyorsun?", 
    options: ["Aşkım", "Balım", "Bitanem", "Canım"], correctAnswer: 0 },
  { id: 13, question: "Sana ilk öğrettiğim karakter neydi?", 
    options: [":)", ":D", ":(", ":P"], correctAnswer: 0 },
  { id: 14, question: "Bizim için en çok birlikte hissettiren şarkı hangisiydi?", 
    options: ["Teoman - Sevdim Seni Bir Kere ", "Adamlar - Yıldızlara Bak", "Yalın - Ki Sen", "Müslüm Gürses - Paramparça"], correctAnswer: 0 },
  { id: 15, question: "Hangisi bizim özel günümüzü en iyi anlatır?", 
    options: ["Birlikte kahve içmek", "Yürüyüş yapmak", "Gün batımını izlemek", "Film gecesi"], correctAnswer: 2 },
  { id: 16, question: "Benim en çok hangi huyumu seviyorsun?", 
    options: ["Sabırlı olmam", "Gülüşüm", "Seni dinlemem", "Kıskançlığım"], correctAnswer: 0 },
  { id: 17, question: "Beraber ne zaman en çok eğlenmiştik?", 
    options: ["Doğum gününde", "Yıl dönümünde", "Oyun oynarken", "Gece sahilde geçirdiğimiz gün"], correctAnswer: 3 },
  { id: 18, question: "Birlikte içmeyi en sevdiğimiz şey ne?", 
    options: ["Kahve", "Soğuk çay", "Limonata", "Farketmez"], correctAnswer: 3 },
  { id: 19, question: "Benim favori rengim neydi?", 
    options: ["Gece Mavisi ", "Siyah", "Kırmızı", "Gök Mavisi"], correctAnswer: 0 },
  { id: 20, question: "Annenle tanıştığımda ne içmiştik seninle?", 
    options: ["Kahve", "Soğuk çay", "Limonata", "Sütlü kahve"], correctAnswer: 2 },
];


const Index = () => {
  const [section, setSection] = useState<Section>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showTyping, setShowTyping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { addToast } = useToast();

  useEffect(() => {
    // Set window size for confetti
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Show typing animation after fade-in
    const timer = setTimeout(() => setShowTyping(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartQuiz = () => setSection("quiz");

  const handleAnswerSelect = (optionIndex: number) => setSelectedOption(optionIndex);

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      addToast({ id: "select-option-required", title: "Bir seçenek seçmelisin aşkım 💕" });
      return;
    }

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSection("result");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
    }
  };

  const calculateScore = () => answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

const getResultMessage = () => {
  const score = calculateScore();
  const total = questions.length; // 20 soru

  if (score === total)
    return "Mükemmelsin aşkım 💖 Her soruda beni kalbimden tanıdın!";
  else if (score >= 15)
    return "Vay be! 💞 Neredeyse kusursuzsun, sadece minicik birkaç detayı kaçırmışsın!";
  else if (score >= 8)
    return "Güzel gidiyorsun aşkım 😍 Bazı şeyleri karıştırmış olabilirsin ama hislerin hep doğru.";
  else if (score >= 4)
    return "Hmm... 😅 Belli ki bazı detaylar aklından uçmuş ama önemli olan sevgimiz 💕";
  else
    return "Unutmuş olabilirsin ama ben seni hiç unutmam 😘 Her cevap yanlış olsa da kalbim seninle!";
};


  const handleShowVideo = () => {
    // Site içinde video göstermek için sadece section değiştiriyoruz
    setSection("video");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-romantic animate-gradient -z-10" />

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={["#FFD6E8", "#FFE8D6", "#FFE8A1", "#FFF5F7"]}
        />
      )}

      {/* Welcome Section */}
      {section === "welcome" && (
        <div className="max-w-2xl w-full flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-foreground mb-4">
              Hoş geldin aşkım 💖
            </h1>

            {showTyping && (
              <div className="text-lg md:text-xl text-muted-foreground font-light min-h-[60px]">
                <TypeAnimation
                  sequence={["Hazırsan küçük bir sürpriz seni bekliyor...", 1000]}
                  wrapper="span"
                  speed={50}
                  cursor={true}
                />
              </div>
            )}
          </div>

          {showTyping && (
            <div className="animate-float mt-8">
              <RomanticButton onClick={handleStartQuiz} size="lg" className="text-lg">
                Başlayalım 💕
              </RomanticButton>
            </div>
          )}

          <Heart className="text-accent w-12 h-12 mt-8 animate-heart-pulse" />
        </div>
      )}

      {/* Quiz Section */}
      {section === "quiz" && (
        <div className="max-w-2xl w-full animate-slide-up">
          <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-muted-foreground">
                Soru {currentQuestion + 1} / {questions.length}
              </span>
              <div className="flex gap-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index <= currentQuestion ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-foreground mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-2xl text-left transition-all transform hover:scale-[1.02] ${
                    selectedOption === index
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <RomanticButton onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? "Sonraki" : "Sonuçları Göster"}
              </RomanticButton>
            </div>
          </div>
        </div>
      )}

      {/* Result Section */}
      {section === "result" && (
        <div className="max-w-2xl w-full animate-fade-in text-center space-y-8">
          <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
            <div className="space-y-4">
              <div className="text-6xl md:text-8xl animate-heart-pulse">💖</div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">
                {calculateScore()} / {questions.length} Doğru!
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                {getResultMessage()}
              </p>
            </div>

            <RomanticButton onClick={handleShowVideo} size="lg" className="text-lg">
              <Play className="w-5 h-5" />
              Sürpriz Videoyu Aç 🎬
            </RomanticButton>
          </div>

          <p className="text-sm text-muted-foreground mt-8 text-center">
            Bu site sadece bize özel 💫
          </p>
        </div>
      )}

      {/* Video Section */}
      {section === "video" && (
        <div className="max-w-4xl w-full animate-fade-in space-y-6">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center text-foreground mb-8">
            5 yılın özeti 💞
          </h2>

          <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl p-4 md:p-6">
  <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl shadow-lg">
    <iframe
      src="https://drive.google.com/file/d/1p3hf1PSqwU_BF8eXE1DRaOXlZZNQ0hm-/preview"
      className="absolute top-0 left-0 w-full h-full"
      allow="autoplay"
      allowFullScreen
    ></iframe>
  </div>
</div>
          <div className="text-center space-y-4 pt-8">
            <p className="text-xl md:text-2xl font-script text-foreground">
              Seni her geçen gün daha çok seviyorum 💖
            </p>
            <p className="text-lg text-muted-foreground">— Berkay</p>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-12">
            Bu site sadece bize özel 💫
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
