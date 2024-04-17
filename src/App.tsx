import { useEffect, useState, useRef } from 'react'
import './App.css'
import corpus from './utils/corpus.ts'
import Trie from './utils/trie.ts'
import SpellChecker from './utils/spell.ts'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout.tsx'
// import Vanta from "vanta/dist/vanta.fog.min";
// import * as Three from "three"

type choice = {
  word: string;
  distance: number;
}

function App() {
  const [node, setNode] = useState<Trie>();
  const [spell, setSpell] = useState<SpellChecker>();
  const [display, setDisplay] = useState<choice[]>([]);

  useEffect(() => {
    setNode(new Trie(corpus));
    setSpell(new SpellChecker(corpus));
  }, [])

  function wagnerFischer(s1: string, s2: string): number {
    let len_s1: number = s1.length;
    let len_s2: number = s2.length;
    if (len_s1 > len_s2) {
      [s1, s2] = [s2, s1];
      [len_s1, len_s2] = [len_s2, len_s1];
    }

    let current_row: number[] = Array(len_s1 + 1).fill(0).map((_, index) => index);
    for (let i = 1; i <= len_s2; i++) {
      let previous_row = current_row;
      current_row = [i];

      for (let j = 1; j <= len_s1; j++) {
        let add: number = previous_row[j] + 1;
        let del: number = current_row[j - 1] + 1;
        let change: number = previous_row[j - 1];
        if (s1[j - 1] !== s2[i - 1]) {
          change += 1;
        }
        current_row[j] = Math.min(add, del, change);
      }
    }
    return current_row[len_s1];
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(node?.longestCommonPrefix())

    const value = e.target.value;
    setDisplay([]);

    const words = value.split(' ');
    const lastWord = words[words.length - 1];

    if (lastWord.length < 3) return;

    const result = node?.search(lastWord);
    let choices1: choice[] = [];
    let choices2: choice[] = [];

    result?.forEach((word) => {
      const distance = wagnerFischer(lastWord, word);
      let temp = { word, distance };
      if (distance) choices1.push(temp);
    });

    choices1.sort((a, b) => a.distance - b.distance);

    if (choices1.length < 5) {
      let spellCheck = spell?.check(lastWord);
      spellCheck?.forEach((word) => {
        const distance = wagnerFischer(lastWord, word);
        let temp = { word, distance };
        if (!choices2.some((s) => s.word == word) && !choices1.some((s) => s.word == word)) choices2.push(temp);
      });
      choices2.sort((a, b) => a.distance - b.distance);
    }
    setDisplay([...choices1.slice(0, 5), ...choices2.slice(0, 5 - choices1.length)])
  }

  return (
      <BrowserRouter>
        <Routes>
            <Route key={"Home"} index element={<Layout page={"landing"}/>} />
            <Route key={"Home"} path='/try' element={<Layout page={"try"}/>} />
        </Routes>
      </BrowserRouter>
    // <div>
    //   <div>
    //     <input type="text" onChange={handleChange} />
    //     <div>
    //       {display.map((choice) => (
    //         <div key={choice.word}>
    //           <span>{choice.word}</span>
    //           <span>{"\t" + choice.distance}</span>
    //         </div>
    //       ))
    //       }
    //     </div>
    //   </div>
    // </div>
  )
}

export default App
