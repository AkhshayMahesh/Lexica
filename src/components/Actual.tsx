import { useEffect, useState, useRef } from "react";
import Trie from "../utils/trie";
import SpellChecker from "../utils/spell";
import corpus from "../utils/corpus";
import { xor } from "three/examples/jsm/nodes/Nodes.js";

type choice = {
    word: string;
    distance: number;
}

const Actual = () => {
    const [trie, setTrie] = useState<Trie>();
    const [spell, setSpell] = useState<SpellChecker>();
    const [focused, setFocused] = useState<boolean>(false)
    const [space, setSpace] = useState<boolean>(false)
    const [content, setContent] = useState<string>("")
    // const [cursor, setCursor] = useState("")

    const span = useRef<HTMLSpanElement>(null);
    const edit = useRef<HTMLDivElement>(null);
    const high = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTrie(new Trie(corpus));
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

    const handleSpace = (e: any) => {
        if (e.key === " ") {
            setSpace(true);
            if (focused) setContent((prev) => prev + e.key);
            if (focused) span.current!.innerText = '';
            let result: string[] = [];

            let words = content?.split(' ');
            if (high.current) high.current.innerHTML = '';
            words?.forEach((w) => {
                if (trie?.find(w)) {
                    result.push(w);
                } else {
                    const s = trie?.search(w);
                    let choices1: choice[] = [];
                    let choices2: choice[] = [];

                    s?.forEach((word) => {
                        const distance = wagnerFischer(w, word);
                        let temp = { word, distance };
                        if (distance) choices1.push(temp);
                    });

                    choices1.sort((a, b) => a.distance - b.distance);

                    let spellCheck = spell?.check(w);
                    spellCheck?.forEach((word) => {
                        const distance = wagnerFischer(w, word);
                        let temp = { word, distance };
                        if (!choices2.some((s) => s.word === word) && !choices1.some((s) => s.word === word)) choices2.push(temp);
                    });
                    choices2.sort((a, b) => a.distance - b.distance);

                    result?.push(
                        `<div class=" editable-text">
                            ${w}
                            <div class=" inner absolute h-32 w-max overflow-scroll border flex-col">
                                ${choices1.map((choice, index) => (
                            `<div key=${index} class="mistake text-darkGreen p-1 cursor-pointer border">
                                        ${choice.word}
                                    </div>`
                        )).join(' ')}
                                ${choices2.map((choice, index) => (
                            `<div key=${index} class="mistake text-darkGreen p-1 cursor-pointer border">
                                        ${choice.word}
                                    </div>`
                        )).join(' ')}
                            </div>
                        </div>`
                    );
                }
            });

            if (edit.current) edit.current.innerHTML = result.join(" ");
        } else if (e.keyCode >= 65 && e.keyCode <= 90) {
            setSpace(false);
            if (focused) setContent((prev) => prev + e.key);
        } else if (e.key == "Backspace") {
            if (focused) setContent((prev) => prev.slice(0, prev.length - 2));
        }
    };

    const handleChange = (e: any) => {
        span.current!.innerText = '';
        if (space) return;
        let lastWord = (e.target.innerText).split(' ')[(e.target.innerText).split(' ').length - 1];
        if (lastWord.length < 2) return;

        const result = trie?.search(lastWord);
        let choices: choice[] = [];

        result?.forEach((word) => {
            const distance = wagnerFischer(lastWord, word);
            let temp = { word, distance };
            if (distance) choices.push(temp);
        });

        choices.sort((a, b) => -a.distance + b.distance);
        span.current!.innerText = `${choices[0] ? choices[0]?.word.slice(lastWord.length) : ""}`;
    };

    const handleHoverIn = (e: any) => {
        e.target.setAttribute('contenteditable', true);
    }

    const handleHoverOut = (e: any) => {xor
        e.target.setAttribute('contenteditable', false);
    }

    const handleFocus = () => {
        setFocused(true);
    }

    const handleBlur = () => {
        setFocused(false);
        span.current!.innerText = '';
    }

    useEffect(() => {
        document.addEventListener('keydown', handleSpace);
        return () => {
            document.removeEventListener('keydown', handleSpace);
        }
    }, [focused, content])

    return (
        <div className=" w-full flex flex-col items-center">
            <div id="edit" ref={edit}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onPointerMove={handleHoverIn}
                onPointerLeave={handleHoverOut}
                onInput={handleChange}
                className=" gap-1 flex text-2xl break-words outline-none bg-[#fff] bg-opacity-30 w-3/5 rounded-xl shadow-lg shadow-gray border-gray focus:border-darkGreen p-7 box-content backdrop-blur-sm border-2 h-[50vh] mt-[12%] text-gray overflow-scroll">
                {/* <div ref={high} className=" flex"></div> */}
                <span ref={span} className=" text-lightGray"></span>
                {/* <span ref={span} className=" text-[#000] bg-red bg-opacity-40 underline underline-offset-2 p-[0.15rem]"></span> */}
            </div>
        </div>
    )
}

export default Actual;

// const handleSpace = (e: any) => {
//     if (e.key === " ") {
//         setSpace(true);
//         if (focused) span.current!.innerText = '';
//         let result: string[] = [];

//         let words = edit.current?.innerText.split(' ');
//         words?.forEach((w) => {
//             if (trie?.find(w)) {
//                 result.push(w);
//             } else {
//                 const result = trie?.search(w);
//                 let choices1: choice[] = [];
//                 let choices2: choice[] = [];

//                 result?.forEach((word) => {
//                     const distance = wagnerFischer(w, word);
//                     let temp = { word, distance }; const result = trie?.search(w);
//                     let choices1: choice[] = [];
//                     let choices2: choice[] = [];

//                     result?.forEach((word) => {
//                         const distance = wagnerFischer(w, word);
//                         let temp = { word, distance };
//                         if (distance) choices1.push(temp);
//                     });

//                     choices1.sort((a, b) => a.distance - b.distance);

//                     if (choices1.length < 5) {
//                         let spellCheck = spell?.check(w);
//                         spellCheck?.forEach((word) => {
//                             const distance = wagnerFischer(w, word);
//                             let temp = { word, distance };
//                             if (!choices2.some((s) => s.word == word) && !choices1.some((s) => s.word == word)) choices2.push(temp);
//                         });
//                         choices2.sort((a, b) => a.distance - b.distance);
//                     }
//                     if (distance) choices1.push(temp);
//                 });

//                 choices1.sort((a, b) => a.distance - b.distance);

//                 // if (choices1.length < 5) {
//                 //     let spellCheck = spell?.check(w);
//                 //     spellCheck?.forEach((word) => {
//                 //         const distance = wagnerFischer(w, word);
//                 //         let temp = { word, distance };
//                 //         if (!choices2.some((s) => s.word == word) && !choices1.some((s) => s.word == word)) choices2.push(temp);
//                 //     });
//                 //     choices2.sort((a, b) => a.distance - b.distance);
//                 // }

//                 let temp = `<span>${w}
//                     ${choices1.map((choice, index) => {
//                     return <span key={index} className="text-darkGreen p-1 rounded-md cursor-pointer">{choice.word}</span>
//                 })}
//                     ${choices2.map((choice, index) => {
//                     return <span key={index} className="text-darkGreen p-1 rounded-md cursor-pointer">{choice.word}</span>
//                 })}
//                 </span>`
//                 console.log("yes")

//                 result?.push(temp);
//             }
//         });
//         result.push(`<span ref={span} className=" text-lightGray"></span>`);

//         if (edit.current) edit.current.innerHTML = result.join(' ');
//         console.log(edit);
//     } else {
//         setSpace(false);
//     }
// }
// Inside your handleSpace function


// const handleChange = (e: any) => {
//     span.current!.innerText = '';
//     if (space) return;
//     let lastWord = (e.target.innerText).split(' ')[(e.target.innerText).split(' ').length - 1];
//     if (lastWord.length < 2) return;

//     const result = trie?.search(lastWord);
//     let choices: choice[] = [];

//     result?.forEach((word) => {
//         const distance = wagnerFischer(lastWord, word);
//         let temp = { word, distance };
//         if (distance) choices.push(temp);
//     });

//     choices.sort((a, b) => -a.distance + b.distance);

//     span.current!.innerText = `${choices[0] ? choices[0]?.word.slice(lastWord.length) : ""}`;

//     if (edit.current) {
//         const content = edit.current.innerHTML;
//         // edit.current.innerHTML = content.replace(new RegExp(`(${lastWord})($|\\s)`, 'g'), '<span class="mistake" data-tooltip="Suggestion"></span> ');
//     }
// };
