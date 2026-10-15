interface NotationEntry {
  readonly symbol: string;
  readonly meaning: string;
  readonly example: string;
}

export interface NotationGroup {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly entries: readonly NotationEntry[];
}

export const notationGroups: readonly NotationGroup[] = [
  {
    id: "operasi",
    title: "Operasi dan perbandingan",
    description:
      "Tanda untuk menghitung, membandingkan, dan menyatakan hubungan.",
    entries: [
      {
        symbol: "+,-",
        meaning: "Penjumlahan dan pengurangan.",
        example: "3+2=5,\\quad 3-2=1",
      },
      {
        symbol: "\\times,\\cdot",
        meaning:
          "Perkalian; titik juga dipakai untuk hasil kali skalar vektor.",
        example: "3\\times2=3\\cdot2=6",
      },
      {
        symbol: "\\div,\\frac{a}{b}",
        meaning: "Pembagian dan pecahan; penyebut tidak boleh nol.",
        example: "6\\div2=\\frac{6}{2}=3",
      },
      {
        symbol: "=,\\ne",
        meaning: "Sama dengan dan tidak sama dengan.",
        example: "2+3=5,\\quad 2\\ne3",
      },
      {
        symbol: "<,>",
        meaning: "Kurang dari dan lebih dari.",
        example: "2<3,\\quad 5>4",
      },
      {
        symbol: "\\le,\\ge",
        meaning: "Kurang dari atau sama dengan; lebih dari atau sama dengan.",
        example: "x\\le5,\\quad y\\ge0",
      },
      {
        symbol: "\\approx",
        meaning: "Nilai pendekatan, bukan persamaan eksak.",
        example: "\\pi\\approx3{,}14",
      },
      {
        symbol: "\\propto",
        meaning:
          "Sebanding; konstanta perbandingan tetap pada kondisi yang dinyatakan.",
        example: "F\\propto a\\quad(m\\text{ tetap})",
      },
      {
        symbol: "\\pm,\\mp",
        meaning: "Pasangan tanda plus-minus dan minus-plus.",
        example: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
      },
      {
        symbol: "(a),[a],\\{a\\}",
        meaning:
          "Pengelompokan operasi; kurung juga dipakai untuk interval dan himpunan.",
        example: "2[3+(4-1)]=12",
      },
      {
        symbol: "\\lvert x\\rvert",
        meaning: "Nilai mutlak; jarak bilangan dari nol.",
        example: "\\lvert-3\\rvert=3",
      },
      {
        symbol: "\\%,a:b",
        meaning: "Persen dan perbandingan.",
        example: "25\\%=\\frac14,\\quad 2:3=\\frac23",
      },
      {
        symbol: "\\ldots,\\cdots",
        meaning: "Kelanjutan pola, ditulis pada garis bawah atau tengah.",
        example: "1,2,3,\\ldots;\\quad 1+2+\\cdots+n",
      },
      {
        symbol: "\\infty",
        meaning:
          "Tak hingga; bukan bilangan real yang dapat dihitung seperti bilangan biasa.",
        example: "\\lim_{x\\to\\infty}\\frac1x=0",
      },
    ],
  },
  {
    id: "himpunan",
    title: "Bilangan, himpunan, dan interval",
    description:
      "Jenis bilangan, operasi himpunan, dan batas interval. Periksa apakah definisi bilangan asli yang digunakan menyertakan nol.",
    entries: [
      {
        symbol: "\\mathbb{N},\\mathbb{Z}",
        meaning:
          "Bilangan asli dan bilangan bulat. Di halaman ini bilangan asli dimulai dari satu.",
        example:
          "\\mathbb{N}=\\{1,2,\\ldots\\},\\quad \\mathbb{Z}=\\{\\ldots,-1,0,1,\\ldots\\}",
      },
      {
        symbol: "\\mathbb{Q},\\mathbb{R}",
        meaning: "Bilangan rasional dan bilangan real.",
        example:
          "\\frac23\\in\\mathbb{Q},\\quad \\sqrt2\\in\\mathbb{R}\\setminus\\mathbb{Q}",
      },
      {
        symbol: "\\mathbb{C},i",
        meaning:
          "Bilangan kompleks dan satuan imajiner; biasanya pada materi pengayaan.",
        example: "i^2=-1,\\quad z=a+bi",
      },
      {
        symbol: "\\in,\\notin",
        meaning: "Anggota dan bukan anggota himpunan.",
        example: "2\\in\\{1,2,3\\},\\quad4\\notin\\{1,2,3\\}",
      },
      {
        symbol: "\\subseteq,\\subsetneq",
        meaning:
          "Himpunan bagian, serta himpunan bagian sejati. Tanda subset tanpa garis bawah berbeda konvensi antar buku.",
        example: "\\{1\\}\\subsetneq\\{1,2\\},\\quad A\\subseteq A",
      },
      {
        symbol: "\\cup,\\cap",
        meaning: "Gabungan dan irisan himpunan.",
        example: "\\{1,2\\}\\cup\\{2,3\\}=\\{1,2,3\\}",
      },
      {
        symbol: "\\setminus,A^c",
        meaning: "Selisih dan komplemen terhadap himpunan semesta.",
        example: "A^c=S\\setminus A",
      },
      {
        symbol: "\\varnothing,S",
        meaning:
          "Himpunan kosong dan himpunan semesta; semesta juga sering ditulis U.",
        example: "A\\cap A^c=\\varnothing",
      },
      {
        symbol: "n(A),\\lvert A\\rvert",
        meaning: "Banyak anggota himpunan berhingga.",
        example: "n(\\{2,4,6\\})=3",
      },
      {
        symbol: "\\{x\\mid\\cdots\\}",
        meaning:
          "Notasi pembentuk himpunan; garis dibaca «sedemikian sehingga».",
        example: "A=\\{x\\in\\mathbb{R}\\mid x>0\\}",
      },
      {
        symbol: "(a,b),[a,b]",
        meaning:
          "Interval terbuka dan tertutup; kurung siku menyertakan ujung.",
        example: "x\\in[1,3)\\iff1\\le x<3",
      },
      {
        symbol: "\\mathbb{R}^2,\\mathbb{R}^3",
        meaning: "Pasangan atau tripel koordinat real.",
        example: "(x,y)\\in\\mathbb{R}^2",
      },
    ],
  },
  {
    id: "logika",
    title: "Logika matematika",
    description: "Notasi yang muncul dalam pernyataan, syarat, dan pembuktian.",
    entries: [
      {
        symbol: "\\neg p",
        meaning: "Negasi atau ingkaran pernyataan.",
        example: "\\neg(x>0)\\iff x\\le0",
      },
      {
        symbol: "p\\land q,p\\lor q",
        meaning: "Konjungsi «dan» serta disjungsi inklusif «atau».",
        example: "x>0\\land x<3",
      },
      {
        symbol: "\\Rightarrow,\\implies",
        meaning: "Implikasi; pernyataan kiri mengakibatkan pernyataan kanan.",
        example: "x=2\\Rightarrow x^2=4",
      },
      {
        symbol: "\\Leftrightarrow,\\iff",
        meaning: "Ekuivalensi; «jika dan hanya jika».",
        example: "x^2=0\\iff x=0",
      },
      {
        symbol: "\\forall,\\exists",
        meaning: "«Untuk setiap» dan «terdapat».",
        example: "\\forall x\\in\\mathbb{R},\\ x^2\\ge0",
      },
      {
        symbol: "\\therefore,\\because",
        meaning: "«Oleh karena itu» dan «karena».",
        example: "x=2\\ \\therefore\\ x+1=3",
      },
      {
        symbol: ":=",
        meaning: "Didefinisikan sebagai.",
        example: "f(x):=x^2+1",
      },
    ],
  },
  {
    id: "aljabar",
    title: "Aljabar, pangkat, akar, dan logaritma",
    description:
      "Variabel, parameter, dan operasi yang mendasari persamaan SMA. Logaritma real memerlukan basis positif selain satu dan argumen positif.",
    entries: [
      {
        symbol: "x,y,a,b,c",
        meaning: "Variabel atau parameter; artinya ditentukan pada soal.",
        example: "ax^2+bx+c=0,\\quad a\\ne0",
      },
      {
        symbol: "x^n,x^{-n}",
        meaning: "Pangkat positif dan negatif.",
        example: "x^{-2}=\\frac1{x^2}\\quad(x\\ne0)",
      },
      {
        symbol: "\\sqrt{x},\\sqrt[n]{x}",
        meaning:
          "Akar utama kuadrat dan akar pangkat n; perhatikan domain real.",
        example: "\\sqrt9=3,\\quad\\sqrt[3]{-8}=-2",
      },
      {
        symbol: "x^{p/q}",
        meaning: "Pangkat rasional, dengan syarat domain yang sesuai.",
        example: "8^{2/3}=(\\sqrt[3]{8})^2=4",
      },
      {
        symbol: "\\log_a x,{}^a\\!\\log x",
        meaning:
          "Logaritma basis a; notasi pangkat di kiri lazim di buku Indonesia.",
        example: "\\log_2 8={}^2\\!\\log8=3",
      },
      {
        symbol: "\\ln x,\\log x",
        meaning:
          "Logaritma natural berbasis e; log tanpa basis sering berbasis sepuluh di SMA.",
        example: "\\ln e=1,\\quad\\log_{10}100=2",
      },
      {
        symbol: "D,\\Delta",
        meaning:
          "Diskriminan persamaan kuadrat; jangan tertukar dengan perubahan besaran fisika.",
        example: "D=b^2-4ac",
      },
      {
        symbol: "x_1,x_2",
        meaning: "Akar atau solusi persamaan; indeks membedakan nilainya.",
        example: "x_1+x_2=-\\frac ba",
      },
      {
        symbol: "P(x),Q(x),r",
        meaning:
          "Polinom, hasil bagi, dan sisa pembagian; huruf dapat berbeda.",
        example: "P(x)=(x-a)Q(x)+r",
      },
      {
        symbol: "\\begin{cases}x+y=3\\\\x-y=1\\end{cases}",
        meaning:
          "Kurung sistem persamaan: semua persamaan harus dipenuhi bersamaan.",
        example: "(x,y)=(2,1)",
      },
    ],
  },
  {
    id: "fungsi",
    title: "Fungsi, barisan, deret, dan keuangan",
    description:
      "Notasi fungsi, suku barisan, jumlah deret, serta bunga dan pertumbuhan.",
    entries: [
      {
        symbol: "f:A\\to B",
        meaning: "Fungsi dari domain A ke kodomain B.",
        example: "f:\\mathbb{R}\\to\\mathbb{R},\\quad f(x)=x^2",
      },
      {
        symbol: "x\\mapsto f(x)",
        meaning: "Aturan pemetaan setiap masukan ke keluaran.",
        example: "x\\mapsto2x+1",
      },
      {
        symbol: "f(x),y",
        meaning: "Nilai fungsi pada x; keluaran dapat ditulis y.",
        example: "y=f(3)=3^2=9",
      },
      {
        symbol: "(f\\circ g)(x)",
        meaning: "Komposisi; fungsi g diterapkan terlebih dahulu.",
        example: "(f\\circ g)(x)=f(g(x))",
      },
      {
        symbol: "f^{-1}(x)",
        meaning:
          "Fungsi invers, bukan kebalikan perkalian fungsi; memerlukan fungsi yang invertibel.",
        example: "f(x)=2x+1\\Rightarrow f^{-1}(x)=\\frac{x-1}{2}",
      },
      {
        symbol: "U_n,a_n",
        meaning: "Suku ke-n; dua notasi yang sering dipakai.",
        example: "U_n=a+(n-1)b",
      },
      {
        symbol: "S_n,\\sum_{k=1}^{n}",
        meaning:
          "Jumlah n suku dan operator penjumlahan; k adalah indeks berjalan.",
        example: "S_n=\\sum_{k=1}^{n}U_k",
      },
      {
        symbol: "b,d",
        meaning:
          "Beda tetap barisan aritmetika; buku Indonesia sering menggunakan b.",
        example: "b=U_{n+1}-U_n",
      },
      {
        symbol: "r",
        meaning: "Rasio tetap barisan geometri; penyebut harus tidak nol.",
        example: "r=\\frac{U_{n+1}}{U_n},\\quad U_n=ar^{n-1}",
      },
      {
        symbol: "S_\\infty",
        meaning: "Jumlah deret geometri tak hingga yang konvergen.",
        example: "S_\\infty=\\frac{a}{1-r},\\quad\\lvert r\\rvert<1",
      },
      {
        symbol: "M_0,M_n,i,n",
        meaning:
          "Modal awal, modal akhir, bunga per periode, dan jumlah periode.",
        example: "M_n=M_0(1+i)^n",
      },
    ],
  },
  {
    id: "geometri",
    title: "Geometri, koordinat, dan transformasi",
    description:
      "Notasi titik, garis, sudut, koordinat, dan transformasi. Bedakan nama titik dari panjang ruas dan nama bangun.",
    entries: [
      {
        symbol: "A,B,C;(x,y)",
        meaning: "Nama titik dan pasangan koordinat.",
        example: "A=(2,3)",
      },
      {
        symbol: "\\overline{AB},AB",
        meaning:
          "Ruas garis AB; AB juga sering menyatakan panjangnya sesuai konteks.",
        example: "AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}",
      },
      {
        symbol: "\\angle ABC",
        meaning: "Sudut dengan titik sudut B.",
        example: "\\angle ABC=60^\\circ",
      },
      {
        symbol: "\\triangle ABC",
        meaning: "Segitiga yang bertitik sudut A, B, dan C.",
        example: "\\angle A+\\angle B+\\angle C=180^\\circ",
      },
      {
        symbol: "\\parallel,\\perp",
        meaning: "Sejajar dan tegak lurus.",
        example: "AB\\parallel CD,\\quad AB\\perp BC",
      },
      {
        symbol: "\\cong,\\sim",
        meaning: "Kongruen dan sebangun dalam geometri.",
        example: "\\triangle ABC\\sim\\triangle DEF",
      },
      {
        symbol: "\\widehat{AB}",
        meaning: "Busur AB pada lingkaran.",
        example: "s=\\frac{\\theta}{360^\\circ}\\,2\\pi r",
      },
      {
        symbol: "r,d,K,L,V",
        meaning:
          "Jari-jari, diameter, keliling, luas, dan volume dalam notasi Indonesia.",
        example: "d=2r,\\quad K=2\\pi r,\\quad L=\\pi r^2",
      },
      {
        symbol: "\\pi",
        meaning:
          "Konstanta rasio keliling lingkaran terhadap diameter; pecahan 22/7 hanya pendekatan.",
        example: "\\pi\\approx\\frac{22}{7}",
      },
      {
        symbol: "m",
        meaning: "Gradien garis; juga simbol massa dalam fisika.",
        example: "m=\\frac{y_2-y_1}{x_2-x_1}",
      },
      {
        symbol: "T(a,b)",
        meaning: "Translasi dengan pergeseran horizontal a dan vertikal b.",
        example: "(x,y)\\mapsto(x+a,y+b)",
      },
      {
        symbol: "R(O,\\theta),D(O,k)",
        meaning:
          "Rotasi berpusat O dan dilatasi berfaktor k; notasi transformasi dapat berbeda.",
        example: "D(O,k):(x,y)\\mapsto(kx,ky)",
      },
    ],
  },
  {
    id: "trigonometri",
    title: "Trigonometri",
    description:
      "Sudut dapat dinyatakan dalam derajat atau radian; gunakan satuan yang konsisten.",
    entries: [
      {
        symbol: "\\theta,\\alpha,\\beta",
        meaning: "Huruf Yunani yang sering mewakili sudut.",
        example: "\\alpha+\\beta+\\theta=180^\\circ",
      },
      {
        symbol: "{}^\\circ,\\mathrm{rad}",
        meaning: "Derajat dan radian.",
        example: "180^\\circ=\\pi\\,\\mathrm{rad}",
      },
      {
        symbol: "\\sin\\theta,\\cos\\theta,\\tan\\theta",
        meaning: "Sinus, kosinus, dan tangen.",
        example:
          "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}\\quad(\\cos\\theta\\ne0)",
      },
      {
        symbol: "\\csc\\theta,\\sec\\theta,\\cot\\theta",
        meaning:
          "Kosekan, sekan, dan kotangen; masing-masing kebalikan rasio terkait.",
        example: "\\sec\\theta=\\frac1{\\cos\\theta}",
      },
      {
        symbol: "\\sin^2\\theta",
        meaning: "Kuadrat nilai sinus, bukan sinus dari sudut kuadrat.",
        example: "\\sin^2\\theta+\\cos^2\\theta=1",
      },
      {
        symbol: "\\arcsin x,\\sin^{-1}x",
        meaning:
          "Fungsi invers sinus pada cabang utama; pangkat minus satu di sini bukan kebalikan perkalian.",
        example: "\\arcsin\\frac12=\\frac\\pi6",
      },
    ],
  },
  {
    id: "matriks-vektor",
    title: "Matriks dan vektor",
    description:
      "Elemen dan operasi matriks, serta komponen dan operasi vektor. Panah atau huruf tebal membedakan vektor dari skalar.",
    entries: [
      {
        symbol: "A=(a_{ij}),m\\times n",
        meaning: "Matriks, elemen baris i kolom j, dan ordo matriks.",
        example: "A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}",
      },
      {
        symbol: "A^T,A^{\\mathsf T}",
        meaning: "Transpose matriks: baris menjadi kolom.",
        example: "(A^T)_{ij}=a_{ji}",
      },
      {
        symbol: "\\det A,\\lvert A\\rvert",
        meaning:
          "Determinan matriks persegi; garis vertikal juga dapat berarti nilai mutlak.",
        example: "\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=ad-bc",
      },
      {
        symbol: "A^{-1},I",
        meaning:
          "Invers matriks dan matriks identitas; invers ada jika determinan tidak nol.",
        example: "AA^{-1}=I",
      },
      {
        symbol: "\\vec a,\\mathbf a,\\overrightarrow{AB}",
        meaning: "Notasi vektor, termasuk perpindahan dari A ke B.",
        example: "\\overrightarrow{AB}=\\vec b-\\vec a",
      },
      {
        symbol: "\\hat{\\imath},\\hat{\\jmath},\\hat{k}",
        meaning: "Vektor satuan sumbu koordinat Kartesius.",
        example: "\\vec a=a_x\\hat{\\imath}+a_y\\hat{\\jmath}+a_z\\hat{k}",
      },
      {
        symbol: "\\lVert\\vec a\\rVert,\\lvert\\vec a\\rvert",
        meaning: "Besar atau norma vektor.",
        example: "\\lVert\\vec a\\rVert=\\sqrt{a_x^2+a_y^2+a_z^2}",
      },
      {
        symbol: "\\vec a\\cdot\\vec b",
        meaning: "Hasil kali titik; menghasilkan skalar.",
        example:
          "\\vec a\\cdot\\vec b=\\lVert\\vec a\\rVert\\lVert\\vec b\\rVert\\cos\\theta",
      },
      {
        symbol: "\\vec a\\times\\vec b",
        meaning:
          "Hasil kali silang; menghasilkan vektor dengan arah kaidah tangan kanan.",
        example:
          "\\lVert\\vec a\\times\\vec b\\rVert=\\lVert\\vec a\\rVert\\lVert\\vec b\\rVert\\sin\\theta",
      },
    ],
  },
  {
    id: "statistika",
    title: "Statistika dan peluang",
    description:
      "Ukuran pemusatan dan penyebaran data, serta kejadian dan distribusi peluang. Notasi sampel dan populasi dapat berbeda antar buku.",
    entries: [
      {
        symbol: "x_i,f_i,n",
        meaning: "Data ke-i, frekuensi data/kelas ke-i, dan jumlah data.",
        example: "n=\\sum_i f_i",
      },
      {
        symbol: "\\bar x,\\mu",
        meaning: "Rata-rata sampel dan rata-rata populasi.",
        example: "\\bar x=\\frac{\\sum_i f_ix_i}{\\sum_i f_i}",
      },
      {
        symbol: "\\mathrm{Me},\\mathrm{Mo},Q_1,Q_2,Q_3",
        meaning:
          "Median, modus, dan kuartil; median sama dengan kuartil kedua.",
        example: "Q_2=\\mathrm{Me}",
      },
      {
        symbol: "D_k,P_k",
        meaning:
          "Desil ke-k dan persentil ke-k; P juga berarti peluang di konteks lain.",
        example: "D_5=P_{50}=\\mathrm{Me}",
      },
      {
        symbol: "s^2,\\sigma^2",
        meaning:
          "Varians sampel tak bias dan varians populasi; pembagi bergantung definisi yang dipakai.",
        example: "s^2=\\frac{\\sum_{i=1}^n(x_i-\\bar x)^2}{n-1}\\quad(n>1)",
      },
      {
        symbol: "s,\\sigma",
        meaning: "Simpangan baku sampel dan populasi.",
        example: "s=\\sqrt{s^2}",
      },
      {
        symbol: "n!,0!",
        meaning: "Faktorial; banyak susunan n objek berbeda.",
        example: "4!=4\\cdot3\\cdot2\\cdot1=24,\\quad0!=1",
      },
      {
        symbol: "{}_nP_r,P(n,r)",
        meaning: "Permutasi r objek dari n objek berbeda; urutan diperhatikan.",
        example: "{}_nP_r=\\frac{n!}{(n-r)!}",
      },
      {
        symbol: "\\binom nr,{}_nC_r,C(n,r)",
        meaning: "Kombinasi r objek; urutan tidak diperhatikan.",
        example: "\\binom nr=\\frac{n!}{r!(n-r)!}",
      },
      {
        symbol: "S,\\Omega,A,B",
        meaning: "Ruang sampel dan kejadian; A dan B merupakan himpunan hasil.",
        example: "A\\subseteq S",
      },
      {
        symbol: "P(A),P(A^c)",
        meaning: "Peluang kejadian dan komplemennya.",
        example: "P(A^c)=1-P(A)",
      },
      {
        symbol: "P(A\\mid B)",
        meaning: "Peluang bersyarat dengan syarat kejadian B terjadi.",
        example: "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\quad(P(B)>0)",
      },
      {
        symbol: "X,x,P(X=x)",
        meaning: "Variabel acak, nilainya, dan peluang pada nilai tersebut.",
        example: "P(X=x)=\\binom nx p^x(1-p)^{n-x}",
      },
      {
        symbol: "X\\sim\\mathrm{Bin}(n,p)",
        meaning:
          "Distribusi binomial; n percobaan independen dengan peluang sukses p yang tetap.",
        example: "E(X)=np",
      },
      {
        symbol: "X\\sim\\mathcal N(\\mu,\\sigma^2)",
        meaning:
          "Distribusi normal dengan rata-rata dan varians yang dinyatakan.",
        example: "z=\\frac{x-\\mu}{\\sigma}",
      },
      {
        symbol: "E(X),\\operatorname{Var}(X)",
        meaning: "Nilai harapan dan varians variabel acak.",
        example: "E(X)=\\sum_x xP(X=x)",
      },
      {
        symbol: "r,\\hat y",
        meaning: "Koefisien korelasi Pearson dan prediksi regresi linear.",
        example: "-1\\le r\\le1,\\quad\\hat y=a+bx",
      },
    ],
  },
  {
    id: "kalkulus",
    title: "Limit, turunan, dan integral",
    description:
      "Notasi limit, laju perubahan, dan integral pada materi kalkulus. Cakupannya dapat berbeda menurut kurikulum.",
    entries: [
      {
        symbol: "\\lim_{x\\to a}",
        meaning: "Limit saat x mendekati a; nilai fungsi di a dapat berbeda.",
        example: "\\lim_{x\\to2}(x+1)=3",
      },
      {
        symbol: "x\\to a^-,x\\to a^+",
        meaning: "Pendekatan dari kiri dan dari kanan.",
        example: "\\lim_{x\\to0^+}\\frac1x=+\\infty",
      },
      {
        symbol: "\\Delta x,\\Delta y",
        meaning: "Perubahan hingga pada variabel.",
        example: "\\Delta y=f(x+\\Delta x)-f(x)",
      },
      {
        symbol: "f'(x),y',\\frac{dy}{dx}",
        meaning: "Turunan pertama, yaitu laju perubahan sesaat.",
        example: "\\frac{d}{dx}x^2=2x",
      },
      {
        symbol: "f''(x),\\frac{d^2y}{dx^2}",
        meaning: "Turunan kedua.",
        example: "\\frac{d^2}{dx^2}x^3=6x",
      },
      {
        symbol: "\\frac{d}{dx},dx",
        meaning:
          "Operator turunan dan diferensial; dx juga menandai variabel integrasi.",
        example: "dy=f'(x)\\,dx",
      },
      {
        symbol: "\\int f(x)\\,dx,C",
        meaning: "Integral tak tentu dan konstanta integrasi.",
        example: "\\int2x\\,dx=x^2+C",
      },
      {
        symbol: "\\int_a^b f(x)\\,dx",
        meaning:
          "Integral tentu dengan batas bawah a dan atas b; menyatakan luas bertanda.",
        example: "\\int_0^1x\\,dx=\\frac12",
      },
      {
        symbol: "[F(x)]_a^b",
        meaning: "Evaluasi antiturunan di dua batas.",
        example: "[F(x)]_a^b=F(b)-F(a)",
      },
    ],
  },
  {
    id: "pengukuran",
    title: "Pengukuran dan besaran",
    description:
      "Notasi nilai ukur, ketidakpastian, dan dimensi. Lambang besaran dicetak miring, sedangkan simbol satuan dicetak tegak.",
    entries: [
      {
        symbol: "x\\pm\\Delta x",
        meaning:
          "Hasil pengukuran dan ketidakpastian absolut, bukan dua hasil terpisah.",
        example: "l=(2{,}50\\pm0{,}01)\\,\\mathrm{cm}",
      },
      {
        symbol: "\\frac{\\Delta x}{\\lvert x\\rvert}",
        meaning: "Ketidakpastian relatif untuk nilai terukur tak nol.",
        example: "\\frac{\\Delta x}{\\lvert x\\rvert}\\times100\\%",
      },
      {
        symbol: "a\\times10^n",
        meaning:
          "Notasi ilmiah; koefisien standar memiliki nilai mutlak antara satu dan sepuluh.",
        example: "3{,}0\\times10^8\\,\\mathrm{m\\,s^{-1}}",
      },
      {
        symbol: "[x],\\mathsf M,\\mathsf L,\\mathsf T",
        meaning:
          "Dimensi besaran, massa, panjang, dan waktu; tanda kurung siku dapat memiliki arti lain.",
        example: "[F]=\\mathsf M\\mathsf L\\mathsf T^{-2}",
      },
      {
        symbol: "x_0,x_f,x_x,\\bar x",
        meaning:
          "Indeks awal, akhir, komponen sumbu, dan garis atas untuk rata-rata.",
        example: "\\Delta x=x_f-x_0",
      },
      {
        symbol: "\\mathrm m,\\mathrm s,\\mathrm{kg}",
        meaning:
          "Simbol satuan meter, sekon, dan kilogram; jangan tertukar dengan variabel miring.",
        example: "v=5\\,\\mathrm{m\\,s^{-1}}",
      },
    ],
  },
  {
    id: "mekanika",
    title: "Gerak, gaya, energi, dan gravitasi",
    description:
      "Besaran gerak, gaya, usaha, energi, dan gravitasi. Tentukan arah positif sebelum menghitung komponen vektor.",
    entries: [
      {
        symbol: "s,x,\\Delta x,t",
        meaning:
          "Jarak, posisi, perpindahan, dan waktu; s dan x bergantung konvensi soal.",
        example: "v_x=\\frac{\\Delta x}{\\Delta t}",
      },
      {
        symbol: "v,v_0,\\vec v,a,\\vec a",
        meaning:
          "Kelajuan/kecepatan, kecepatan awal, dan percepatan; bentuk berpanah adalah vektor.",
        example: "v=v_0+at\\quad(a\\text{ konstan})",
      },
      {
        symbol: "g",
        meaning:
          "Besar percepatan gravitasi setempat; tidak selalu sama di semua lokasi.",
        example: "w=mg",
      },
      {
        symbol: "m,F,\\vec F,w",
        meaning:
          "Massa, gaya, dan besar gaya berat; w juga ditulis W pada beberapa buku.",
        example: "\\sum\\vec F=m\\vec a",
      },
      {
        symbol: "N,T",
        meaning:
          "Besar gaya normal dan tegangan tali; N tegak adalah satuan newton.",
        example: "\\sum F_y=N-mg=0",
      },
      {
        symbol: "f_s,f_k,\\mu_s,\\mu_k",
        meaning: "Gaya gesek statis/kinetis dan koefisien gesek.",
        example: "f_s\\le\\mu_sN,\\quad f_k=\\mu_kN",
      },
      {
        symbol: "k,\\Delta l",
        meaning:
          "Konstanta pegas dan perubahan panjang; persamaan komponen gaya memuat tanda pemulih.",
        example: "F_x=-k\\Delta x",
      },
      {
        symbol: "p,\\vec p,J,I",
        meaning:
          "Momentum dan impuls; impuls sering ditulis I, berbeda dengan arus listrik.",
        example: "\\vec J=\\Delta\\vec p",
      },
      {
        symbol: "W,E_k,E_p,E_m",
        meaning: "Usaha, energi kinetik, energi potensial, dan energi mekanik.",
        example: "W=Fs\\cos\\theta,\\quad E_k=\\frac12mv^2",
      },
      {
        symbol: "P",
        meaning: "Daya, yaitu energi atau usaha per satuan waktu.",
        example: "P=\\frac W{\\Delta t}",
      },
      {
        symbol: "\\omega,\\alpha,\\theta",
        meaning: "Kecepatan sudut, percepatan sudut, dan posisi sudut.",
        example: "\\omega=\\omega_0+\\alpha t",
      },
      {
        symbol: "\\tau,\\vec\\tau,r",
        meaning: "Momen gaya atau torsi dan jarak/lengan posisi.",
        example: "\\vec\\tau=\\vec r\\times\\vec F",
      },
      {
        symbol: "I,L,\\vec L",
        meaning:
          "Momen inersia dan momentum sudut; berbeda dengan impuls/arus dan panjang.",
        example: "L=I\\omega\\quad(\\text{sumbu tetap})",
      },
      {
        symbol: "a_c,F_c",
        meaning:
          "Percepatan dan resultan gaya sentripetal; bukan gaya tambahan terpisah.",
        example: "a_c=\\frac{v^2}r,\\quad F_c=m\\frac{v^2}r",
      },
      {
        symbol: "G,M,m,r",
        meaning: "Konstanta gravitasi, dua massa, dan jarak pusat massa.",
        example: "F=G\\frac{Mm}{r^2}",
      },
      {
        symbol: "\\varepsilon,e",
        meaning:
          "Koefisien restitusi pada tumbukan; simbol bervariasi antar buku.",
        example: "e=-\\frac{v_2'-v_1'}{v_2-v_1}",
      },
    ],
  },
  {
    id: "fluida",
    title: "Fluida dan elastisitas",
    description: "Tekanan, aliran, gaya apung, dan sifat bahan.",
    entries: [
      {
        symbol: "\\rho,m,V",
        meaning: "Massa jenis, massa, dan volume.",
        example: "\\rho=\\frac mV",
      },
      {
        symbol: "p,p_0,h",
        meaning: "Tekanan, tekanan acuan, dan kedalaman dari permukaan.",
        example: "p=p_0+\\rho gh",
      },
      {
        symbol: "F_A,V_{\\mathrm{tercelup}}",
        meaning: "Gaya apung dan volume fluida yang dipindahkan.",
        example: "F_A=\\rho_{\\mathrm{fluida}}gV_{\\mathrm{tercelup}}",
      },
      {
        symbol: "Q,A,v",
        meaning: "Debit volume, luas penampang, dan kelajuan aliran.",
        example: "Q=Av\\quad(\\text{aliran seragam})",
      },
      {
        symbol: "\\eta",
        meaning: "Viskositas dinamis; juga simbol efisiensi pada konteks lain.",
        example: "F=6\\pi\\eta rv\\quad(\\text{hukum Stokes})",
      },
      {
        symbol: "\\sigma,\\varepsilon,Y",
        meaning:
          "Tegangan mekanik, regangan, dan modulus Young untuk daerah elastis linear.",
        example:
          "\\sigma=\\frac FA,\\quad\\varepsilon=\\frac{\\Delta l}{l_0},\\quad Y=\\frac\\sigma\\varepsilon",
      },
      {
        symbol: "\\gamma",
        meaning: "Tegangan permukaan; beberapa buku memakai simbol lain.",
        example: "\\gamma=\\frac F{l_{\\mathrm{kontak}}}",
      },
    ],
  },
  {
    id: "suhu-kalor",
    title: "Suhu, kalor, gas, dan termodinamika",
    description:
      "Besaran suhu, kalor, gas, dan proses termodinamika. Perhatikan konvensi tanda usaha dan kalor yang digunakan.",
    entries: [
      {
        symbol: "T,t,{}^\\circ\\mathrm C,\\mathrm K",
        meaning:
          "Suhu; t kadang dipakai untuk Celsius. Kelvin tidak memakai tanda derajat.",
        example:
          "T=\\left(\\frac{t}{^\\circ\\mathrm C}+273{,}15\\right)\\mathrm K",
      },
      {
        symbol: "Q,c,C,m,\\Delta T",
        meaning:
          "Kalor, kalor jenis, kapasitas kalor, massa, dan perubahan suhu.",
        example: "Q=mc\\Delta T=C\\Delta T\\quad(\\text{tanpa perubahan fase})",
      },
      {
        symbol: "L",
        meaning:
          "Kalor laten per satuan massa; berbeda dengan panjang dan momentum sudut.",
        example: "Q=mL\\quad(\\text{perubahan fase})",
      },
      {
        symbol: "\\alpha,\\beta,\\gamma",
        meaning:
          "Koefisien muai panjang, luas, dan volume; relasi berikut pendekatan bahan isotropik.",
        example: "\\beta\\approx2\\alpha,\\quad\\gamma\\approx3\\alpha",
      },
      {
        symbol: "p,V,n,R,T",
        meaning:
          "Tekanan, volume, jumlah zat, konstanta gas, dan suhu mutlak pada gas ideal.",
        example: "pV=nRT",
      },
      {
        symbol: "N,k_B,N_A",
        meaning:
          "Jumlah partikel, konstanta Boltzmann, dan konstanta Avogadro.",
        example: "pV=Nk_BT,\\quad N=nN_A",
      },
      {
        symbol: "U,\\Delta U,W",
        meaning:
          "Energi dalam dan usaha oleh gas; Q positif jika masuk ke sistem.",
        example: "\\Delta U=Q-W",
      },
      {
        symbol: "\\eta",
        meaning: "Efisiensi mesin kalor.",
        example: "\\eta=\\frac{W_{\\mathrm{keluar}}}{Q_{\\mathrm{masuk}}}",
      },
      {
        symbol: "e,\\sigma,A",
        meaning:
          "Emisivitas, konstanta Stefan–Boltzmann, dan luas permukaan; sigma juga dipakai untuk tegangan mekanik.",
        example: "P=e\\sigma AT^4\\quad(\\text{daya radiasi yang dipancarkan})",
      },
    ],
  },
  {
    id: "gelombang",
    title: "Getaran, gelombang, dan bunyi",
    description:
      "Besaran getaran, gelombang, dan bunyi. Bedakan amplitudo, frekuensi, periode, dan fase.",
    entries: [
      {
        symbol: "A,y,x",
        meaning: "Amplitudo, simpangan, dan posisi sepanjang arah rambat.",
        example: "y=A\\sin(\\omega t-kx+\\phi)",
      },
      {
        symbol: "T,f,\\nu",
        meaning: "Periode dan frekuensi; frekuensi juga ditulis nu.",
        example: "f=\\frac1T",
      },
      {
        symbol: "\\lambda,v",
        meaning: "Panjang gelombang dan kelajuan rambat.",
        example: "v=\\lambda f",
      },
      {
        symbol: "\\omega,k,\\phi",
        meaning: "Frekuensi sudut, bilangan gelombang, dan fase awal.",
        example: "\\omega=2\\pi f,\\quad k=\\frac{2\\pi}{\\lambda}",
      },
      {
        symbol: "I,P,A",
        meaning: "Intensitas, daya, dan luas penampang.",
        example: "I=\\frac PA",
      },
      {
        symbol: "\\beta,I_0,\\mathrm{dB}",
        meaning: "Taraf intensitas bunyi, intensitas acuan, dan desibel.",
        example: "\\beta=10\\log_{10}\\frac I{I_0}\\,\\mathrm{dB}",
      },
      {
        symbol: "f_s,f_p,v_s,v_p",
        meaning:
          "Frekuensi sumber/pengamat dan kecepatan sumber/pengamat pada efek Doppler; tanda bergantung arah.",
        example: "f_p=f_s\\frac{v+v_p}{v-v_s}\\quad(\\text{saling mendekat})",
      },
    ],
  },
  {
    id: "optika",
    title: "Cahaya dan optika",
    description:
      "Notasi pemantulan, pembiasan, dan pembentukan bayangan. Konvensi tanda jarak mengikuti model cermin atau lensa yang digunakan.",
    entries: [
      {
        symbol: "n,c,v",
        meaning:
          "Indeks bias, kelajuan cahaya di vakum, dan kelajuan dalam medium.",
        example: "n=\\frac cv",
      },
      {
        symbol: "i,r,\\theta_1,\\theta_2",
        meaning: "Sudut datang dan bias diukur terhadap garis normal.",
        example: "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
      },
      {
        symbol: "s,s',f,R",
        meaning:
          "Jarak benda, jarak bayangan, jarak fokus, dan jari-jari kelengkungan.",
        example: "\\frac1f=\\frac1s+\\frac1{s'}",
      },
      {
        symbol: "M,h,h'",
        meaning:
          "Perbesaran transversal bertanda serta tinggi benda dan bayangan.",
        example: "M=\\frac{h'}h=-\\frac{s'}s",
      },
      {
        symbol: "P,\\mathrm D",
        meaning: "Kekuatan lensa dan dioptri; jarak fokus harus dalam meter.",
        example: "P=\\frac1f,\\quad1\\,\\mathrm D=1\\,\\mathrm{m^{-1}}",
      },
      {
        symbol: "d,m,\\theta,\\lambda",
        meaning:
          "Jarak kisi/celah, orde interferensi, sudut, dan panjang gelombang.",
        example: "d\\sin\\theta=m\\lambda\\quad(\\text{maksimum kisi})",
      },
    ],
  },
  {
    id: "listrik",
    title: "Listrik dan magnet",
    description:
      "Besaran muatan, arus, tegangan, rangkaian, dan medan magnet. Bedakan lambang besaran yang miring dari simbol satuan yang tegak.",
    entries: [
      {
        symbol: "q,Q,e",
        meaning:
          "Muatan listrik dan besar muatan elementer; Q juga dipakai untuk kalor.",
        example: "q=ne\\quad(n\\in\\mathbb Z)",
      },
      {
        symbol: "k_e,\\varepsilon_0",
        meaning: "Konstanta Coulomb dan permitivitas vakum.",
        example: "k_e=\\frac1{4\\pi\\varepsilon_0}",
      },
      {
        symbol: "\\vec E,F,q",
        meaning: "Medan listrik, gaya listrik, dan muatan uji.",
        example: "\\vec F=q\\vec E",
      },
      {
        symbol: "V,\\Delta V,U",
        meaning: "Potensial, beda potensial, dan energi potensial listrik.",
        example: "\\Delta U=q\\Delta V",
      },
      {
        symbol: "I,Q,t",
        meaning: "Arus listrik, muatan yang mengalir, dan waktu.",
        example: "I=\\frac{\\Delta Q}{\\Delta t}",
      },
      {
        symbol: "R,\\rho,l,A",
        meaning:
          "Hambatan, resistivitas, panjang penghantar, dan luas penampang.",
        example: "R=\\rho\\frac lA",
      },
      {
        symbol: "V,I,R",
        meaning: "Beda potensial, arus, dan hambatan pada penghantar ohmik.",
        example: "V=IR",
      },
      {
        symbol: "C,Q,V",
        meaning: "Kapasitansi, muatan kapasitor, dan beda potensial.",
        example: "C=\\frac QV",
      },
      {
        symbol: "\\mathcal E,\\varepsilon,r",
        meaning:
          "Gaya gerak listrik dan hambatan dalam sumber; simbol GGL berbeda antar buku.",
        example: "V=\\mathcal E-Ir\\quad(\\text{sumber mengalirkan arus})",
      },
      {
        symbol: "P,W",
        meaning:
          "Daya listrik dan energi listrik; W di sini variabel energi, bukan simbol satuan watt.",
        example: "P=VI,\\quad W=Pt",
      },
      {
        symbol: "\\vec B,\\mu_0",
        meaning: "Medan magnet dan permeabilitas vakum.",
        example:
          "B=\\frac{\\mu_0I}{2\\pi r}\\quad(\\text{kawat lurus panjang})",
      },
      {
        symbol: "\\vec F_L",
        meaning: "Gaya Lorentz pada muatan bergerak.",
        example: "\\vec F_L=q\\vec v\\times\\vec B",
      },
      {
        symbol: "\\Phi_B,A,\\theta",
        meaning:
          "Fluks magnet, luas, dan sudut antara medan dengan normal permukaan.",
        example: "\\Phi_B=BA\\cos\\theta\\quad(B\\text{ seragam})",
      },
      {
        symbol: "\\mathcal E,N",
        meaning:
          "GGL induksi dan jumlah lilitan; tanda minus menyatakan hukum Lenz.",
        example: "\\mathcal E=-N\\frac{\\Delta\\Phi_B}{\\Delta t}",
      },
      {
        symbol: "L,M",
        meaning: "Induktansi diri dan induktansi bersama.",
        example: "\\mathcal E_L=-L\\frac{dI}{dt}",
      },
      {
        symbol: "V_{\\mathrm{rms}},I_{\\mathrm{rms}}",
        meaning:
          "Tegangan dan arus efektif; rumus berikut untuk gelombang sinus.",
        example: "V_{\\mathrm{rms}}=\\frac{V_{\\max}}{\\sqrt2}",
      },
      {
        symbol: "X_L,X_C,Z",
        meaning:
          "Reaktansi induktif, reaktansi kapasitif, dan besar impedansi RLC seri.",
        example: "X_L=\\omega L,\\quad X_C=\\frac1{\\omega C}",
      },
      {
        symbol: "N_p,N_s,V_p,V_s",
        meaning:
          "Jumlah lilitan dan tegangan primer/sekunder transformator ideal.",
        example: "\\frac{V_s}{V_p}=\\frac{N_s}{N_p}",
      },
    ],
  },
  {
    id: "modern",
    title: "Fisika modern, atom, dan inti",
    description:
      "Notasi foton, atom, inti, dan radioaktivitas pada materi fisika modern dan pengayaan.",
    entries: [
      {
        symbol: "h,f,\\nu,E",
        meaning: "Konstanta Planck, frekuensi, dan energi foton.",
        example: "E=hf=h\\nu",
      },
      {
        symbol: "\\hbar",
        meaning: "Konstanta Planck tereduksi.",
        example: "\\hbar=\\frac h{2\\pi}",
      },
      {
        symbol: "\\phi,W_0,K_{\\max}",
        meaning: "Fungsi kerja logam dan energi kinetik maksimum fotoelektron.",
        example: "K_{\\max}=hf-\\phi",
      },
      {
        symbol: "\\lambda,p",
        meaning: "Panjang gelombang de Broglie dan besar momentum.",
        example: "\\lambda=\\frac hp",
      },
      {
        symbol: "\\gamma,c,v",
        meaning:
          "Faktor Lorentz, kelajuan cahaya di vakum, dan kelajuan relatif.",
        example: "\\gamma=\\frac1{\\sqrt{1-v^2/c^2}}",
      },
      {
        symbol: "m_0,E_0",
        meaning: "Massa diam dan energi diam.",
        example: "E_0=m_0c^2",
      },
      {
        symbol: "{}^A_ZX,A,Z,N",
        meaning: "Notasi nuklida, nomor massa, nomor atom, dan jumlah neutron.",
        example: "{}^{12}_{6}\\mathrm C,\\quad N=A-Z",
      },
      {
        symbol: "\\alpha,\\beta^-,\\beta^+,\\gamma",
        meaning: "Radiasi alfa, beta minus/plus, dan gamma.",
        example: "\\alpha={}^4_2\\mathrm{He},\\quad\\beta^-={}^0_{-1}e",
      },
      {
        symbol: "N,N_0,\\lambda,t",
        meaning:
          "Jumlah inti tersisa, jumlah awal, konstanta peluruhan, dan waktu.",
        example: "N=N_0e^{-\\lambda t}",
      },
      {
        symbol: "A,\\mathcal A,T_{1/2}",
        meaning:
          "Aktivitas radioaktif dan waktu paruh; A juga dipakai untuk nomor massa.",
        example:
          "\\mathcal A=\\lambda N,\\quad T_{1/2}=\\frac{\\ln2}{\\lambda}",
      },
      {
        symbol: "\\Delta m,E_b",
        meaning: "Defek massa dan energi ikat inti.",
        example: "E_b=\\Delta m\\,c^2",
      },
      {
        symbol: "n,l,m_l,m_s",
        meaning: "Bilangan kuantum utama, orbital, magnetik, dan spin.",
        example: "m_s=\\pm\\frac12",
      },
    ],
  },
  {
    id: "satuan",
    title: "Satuan SI dan satuan lainnya",
    description:
      "Simbol satuan pokok SI, satuan turunan, dan satuan lain yang sering digunakan. Simbol satuan dicetak tegak; huruf besar dan kecil harus dibedakan.",
    entries: [
      {
        symbol: "\\mathrm m,\\mathrm{kg},\\mathrm s",
        meaning:
          "Meter untuk panjang, kilogram untuk massa, dan sekon untuk waktu.",
        example: "[v]=\\mathrm{m\\,s^{-1}}",
      },
      {
        symbol: "\\mathrm A,\\mathrm K",
        meaning:
          "Ampere untuk arus listrik dan kelvin untuk suhu termodinamik.",
        example: "I=2\\,\\mathrm A,\\quad T=300\\,\\mathrm K",
      },
      {
        symbol: "\\mathrm{mol},\\mathrm{cd}",
        meaning:
          "Mol untuk jumlah zat dan kandela untuk intensitas cahaya; melengkapi tujuh satuan pokok SI.",
        example: "n=1\\,\\mathrm{mol}",
      },
      {
        symbol: "\\mathrm N,\\mathrm{Pa}",
        meaning: "Newton untuk gaya dan pascal untuk tekanan.",
        example: "1\\,\\mathrm{Pa}=1\\,\\mathrm{N\\,m^{-2}}",
      },
      {
        symbol: "\\mathrm J,\\mathrm W",
        meaning: "Joule untuk energi/usaha dan watt untuk daya.",
        example: "1\\,\\mathrm W=1\\,\\mathrm{J\\,s^{-1}}",
      },
      {
        symbol: "\\mathrm C,\\mathrm V,\\Omega",
        meaning:
          "Coulomb untuk muatan, volt untuk beda potensial, ohm untuk hambatan.",
        example: "1\\,\\Omega=1\\,\\mathrm{V\\,A^{-1}}",
      },
      {
        symbol: "\\mathrm F,\\mathrm H",
        meaning: "Farad untuk kapasitansi dan henry untuk induktansi.",
        example: "1\\,\\mathrm F=1\\,\\mathrm{C\\,V^{-1}}",
      },
      {
        symbol: "\\mathrm T,\\mathrm{Wb}",
        meaning: "Tesla untuk medan magnet dan weber untuk fluks magnet.",
        example: "1\\,\\mathrm{Wb}=1\\,\\mathrm{T\\,m^2}",
      },
      {
        symbol: "\\mathrm{Hz},\\mathrm{rad}",
        meaning: "Hertz untuk frekuensi dan radian untuk sudut.",
        example: "1\\,\\mathrm{Hz}=1\\,\\mathrm{s^{-1}}",
      },
      {
        symbol: "\\mathrm{Bq},\\mathrm{Gy},\\mathrm{Sv}",
        meaning:
          "Becquerel untuk aktivitas, gray untuk dosis serap, sievert untuk dosis ekuivalen/efektif.",
        example: "1\\,\\mathrm{Bq}=1\\,\\mathrm{s^{-1}}",
      },
      {
        symbol: "\\mathrm{eV},\\mathrm u",
        meaning:
          "Elektronvolt untuk energi dan satuan massa atom terpadu; bukan satuan pokok SI.",
        example: "1\\,\\mathrm{eV}=1{,}602176634\\times10^{-19}\\,\\mathrm J",
      },
      {
        symbol: "\\mathrm L,\\mathrm{mL},\\mathrm{kWh}",
        meaning: "Liter, mililiter, dan kilowatt-jam; kWh adalah energi.",
        example:
          "1\\,\\mathrm L=10^{-3}\\,\\mathrm{m^3},\\quad1\\,\\mathrm{kWh}=3{,}6\\times10^6\\,\\mathrm J",
      },
      {
        symbol: "\\mathrm{min},\\mathrm h,{}^\\circ\\mathrm C",
        meaning: "Menit, jam, dan derajat Celsius.",
        example: "1\\,\\mathrm h=60\\,\\mathrm{min}=3600\\,\\mathrm s",
      },
    ],
  },
  {
    id: "awalan",
    title: "Awalan satuan",
    description:
      "Awalan menyatakan faktor pangkat sepuluh dan ditulis menyatu dengan simbol satuan. Huruf besar dan kecil membedakan awalan, seperti mega dan mili.",
    entries: [
      {
        symbol: "\\mathrm T,\\mathrm G,\\mathrm M",
        meaning:
          "Tera, giga, dan mega; kapitalisasi membedakannya dari awalan kecil.",
        example:
          "\\mathrm T:10^{12},\\quad\\mathrm G:10^9,\\quad\\mathrm M:10^6",
      },
      {
        symbol: "\\mathrm k,\\mathrm h,\\mathrm{da}",
        meaning: "Kilo, hekto, dan deka.",
        example:
          "\\mathrm k:10^3,\\quad\\mathrm h:10^2,\\quad\\mathrm{da}:10^1",
      },
      {
        symbol: "\\mathrm d,\\mathrm c,\\mathrm m",
        meaning: "Desi, senti, dan mili.",
        example:
          "\\mathrm d:10^{-1},\\quad\\mathrm c:10^{-2},\\quad\\mathrm m:10^{-3}",
      },
      {
        symbol: "\\mu,\\mathrm n,\\mathrm p",
        meaning: "Mikro, nano, dan piko.",
        example:
          "\\mu:10^{-6},\\quad\\mathrm n:10^{-9},\\quad\\mathrm p:10^{-12}",
      },
      {
        symbol: "\\mathrm f,\\mathrm a",
        meaning: "Femto dan ato; sering muncul pada skala inti atau partikel.",
        example: "\\mathrm f:10^{-15},\\quad\\mathrm a:10^{-18}",
      },
    ],
  },
  {
    id: "huruf-yunani",
    title: "Huruf Yunani",
    description:
      "Alfabet lengkap untuk mengenali simbol. Kolom terakhir menunjukkan bentuk kecil atau varian tipografi; varian tidak otomatis mengubah maknanya.",
    entries: [
      {
        symbol: "\\alpha,\\ A",
        meaning:
          "Alfa; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\alpha",
      },
      {
        symbol: "\\beta,\\ B",
        meaning:
          "Beta; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\beta",
      },
      {
        symbol: "\\gamma,\\ \\Gamma",
        meaning:
          "Gamma; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\gamma",
      },
      {
        symbol: "\\delta,\\ \\Delta",
        meaning:
          "Delta; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\delta",
      },
      {
        symbol: "\\epsilon,\\ E",
        meaning:
          "Epsilon; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\varepsilon",
      },
      {
        symbol: "\\zeta,\\ Z",
        meaning:
          "Zeta; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\zeta",
      },
      {
        symbol: "\\eta,\\ H",
        meaning:
          "Eta; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\eta",
      },
      {
        symbol: "\\theta,\\ \\Theta",
        meaning:
          "Teta; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\vartheta",
      },
      {
        symbol: "\\iota,\\ I",
        meaning:
          "Iota; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\iota",
      },
      {
        symbol: "\\kappa,\\ K",
        meaning:
          "Kapa; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\kappa",
      },
      {
        symbol: "\\lambda,\\ \\Lambda",
        meaning:
          "Lambda; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\lambda",
      },
      {
        symbol: "\\mu,\\ M",
        meaning:
          "Mu; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\mu",
      },
      {
        symbol: "\\nu,\\ N",
        meaning:
          "Nu; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\nu",
      },
      {
        symbol: "\\xi,\\ \\Xi",
        meaning:
          "Ksi; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\xi",
      },
      {
        symbol: "o,\\ O",
        meaning:
          "Omikron; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "o",
      },
      {
        symbol: "\\pi,\\ \\Pi",
        meaning:
          "Pi; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\varpi",
      },
      {
        symbol: "\\rho,\\ P",
        meaning:
          "Rho; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\varrho",
      },
      {
        symbol: "\\sigma,\\ \\Sigma",
        meaning:
          "Sigma; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\varsigma",
      },
      {
        symbol: "\\tau,\\ T",
        meaning:
          "Tau; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\tau",
      },
      {
        symbol: "\\upsilon,\\ \\Upsilon",
        meaning:
          "Upsilon; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\upsilon",
      },
      {
        symbol: "\\phi,\\ \\Phi",
        meaning:
          "Fi; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\varphi",
      },
      {
        symbol: "\\chi,\\ X",
        meaning:
          "Khi; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\chi",
      },
      {
        symbol: "\\psi,\\ \\Psi",
        meaning:
          "Psi; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\psi",
      },
      {
        symbol: "\\omega,\\ \\Omega",
        meaning:
          "Omega; huruf kecil dan kapital. Makna mengikuti topik atau definisi pada soal.",
        example: "\\omega",
      },
    ],
  },
];
