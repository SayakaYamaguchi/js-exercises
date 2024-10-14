/*
## 問題 7.4 💻

以下のデータを使い、下記の各値を求めなさい。
ただし、配列イテレータメソッドを利用し、ループ文(for, while)を使わないこと。

1. `math`の全員の合計点
2. クラスAの`chemistry`の平均点
3. 3科目合計点のクラスC内での平均点
4. 3科目合計点が最も高い人の`name`
5. 全体の`geography`の標準偏差

**出題範囲**: 7.8.1
*/
const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点を計算
const mathTotal = data.reduce((acc, student) => acc + student.math, 0);
console.log("1. mathの全員の合計点:", mathTotal);

// クラスAのchemistryの平均点を計算
const classAChemistryAverage = data
  .filter(student => student.class === "A")
  .map(student => student.chemistry)
  .reduce((acc, score, index, array) => acc + score / array.length, 0);
console.log("2. クラスAのchemistryの平均点:", classAChemistryAverage);

// 3科目合計点のクラスC内での平均点を計算する
const classCTotalAverage = data
  .filter(student => student.class === "C")
  .map(student => student.math + student.chemistry + student.geography)
  .reduce((acc, total, index, array) => acc + total / array.length, 0);
console.log("3. 3科目合計点のクラスC内での平均点:", classCTotalAverage);

// 3科目合計点が最も高い人の名前を求める
const highestTotalIndex = data
  .map((student, index) => ({ total: student.math + student.chemistry + student.geography, index }))
  .reduce((highest, current) => (current.total > highest.total ? current : highest), { total: -Infinity })
  .index;
const highestTotalName = data[highestTotalIndex].name;
console.log("4. 3科目合計点が最も高い人のname:", highestTotalName);

// 全体のgeographyの標準偏差を計算する
const geographyScores = data.map(student => student.geography);
const geographyMean = geographyScores.reduce((acc, score) => acc + score, 0) / geographyScores.length;
const geographyVariance = geographyScores.reduce((acc, score) => acc + (score - geographyMean) ** 2, 0) / geographyScores.length;
const geographyStandardDeviation = Math.sqrt(geographyVariance);
console.log("5. 全体のgeographyの標準偏差:", geographyStandardDeviation);
