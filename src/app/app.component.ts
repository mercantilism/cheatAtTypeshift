import { Component, OnInit } from '@angular/core';
import { WordsList } from './shared';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'Cheat at Typeshift';
  masterWordList: string[];
  masterWordListLengths: {};
  resultWords: string[][] = [];

  wordListSeed = [['a']];

  getRangeByLength;
  resolveWords;
  resultsToCharArrays;
  linearSearch;
  compareWords;

  addSlot = function(){
    this.wordListSeed.push(['a']);
  };
  addLetter = function(letterPlace: string[]){
    letterPlace.push('a');
  };
  removeSlot = function (letterPlace: string[]){
    if (this.wordListSeed.length > 1){
      this.wordListSeed.splice(this.wordListSeed.indexOf(letterPlace), 1);
    }
  };
  removeLetter = function (letterPlace: string[], letter: string){
    if(letterPlace.length > 1){
      letterPlace.splice(letterPlace.indexOf(letter), 1);
    }
  };

  constructor( private allPossibleWords: WordsList ) {}
  ngOnInit() {
    this.masterWordList = this.allPossibleWords.wordList.words;
    this.masterWordListLengths = this.allPossibleWords.wordList.lengths;

    this.getRangeByLength = function(num){
      let rangeStart;
      if (num > 2) {
        rangeStart = this.masterWordListLengths[num.toString() - 1];
      }
      const rangeEnd = (this.masterWordListLengths[num.toString()]) - 1;

      return {
        'rangeStart': rangeStart || 0,
        'rangeEnd': rangeEnd
      };
    };

    this.resultsToCharArrays = function(words){
      const arrayifiedWords = words.map(word => {
        let charArray: string[] = [];
        for (let letter of word){
          charArray.push(letter);
        }
        return charArray;
      });
      return arrayifiedWords;
    };

    this.resolveWords = function(){
        const {rangeStart, rangeEnd} = this.getRangeByLength(this.wordListSeed.length);
        const narrowWordList: string[] = this.masterWordList.slice(rangeStart, rangeEnd);
        const resultWordsStrings = this.linearSearch(narrowWordList);
        this.resultWords = this.resultsToCharArrays(resultWordsStrings);
    };

    this.linearSearch = function(wordList: string[]): string[]{
        let parsedWordList: string[] = [];
        for (let i  = 0; i < wordList.length; i++) {
          if(this.compareWords(wordList[i])) {
             parsedWordList.push(wordList[i]);
          }
        }
        return parsedWordList;
    };

    this.compareWords = function(collectionWord, userLetters = this.wordListSeed) {
        if (collectionWord.length <= 0){
            return true;
        }
        const userLetterSlot = userLetters[0];
        for( let letterIndex = 0; letterIndex <= userLetterSlot.length; letterIndex++){
            if (letterIndex === userLetterSlot.length){
                return false;
            }
            if (collectionWord[0] === userLetterSlot[letterIndex]){
              return this.compareWords(collectionWord.slice(1), userLetters.slice(1));
            }
        }
    };

  }

}
