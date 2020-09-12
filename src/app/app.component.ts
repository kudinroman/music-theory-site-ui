import { Component } from '@angular/core';

class Note {
    name: string;
    displayName: string;
    className: string;

    constructor(name: string, displayName: string, className: string) {
        this.name = name;
        this.displayName = displayName;
        this.className = className;
    }
}

@Component({
    selector: 'game',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isGameOn = false
    score = 0
    indicatorClassName = 'blue'
    notePosition = 0
    resultText = ''
    timer: number;
    notes: Note[] = [
        new Note('c', 'До', '_c1'),
        new Note('d', 'Ре', '_d1'),
        new Note('e', 'Ми', '_e1'),
        new Note('f', 'Фа', '_f1'),
        new Note('g', 'Соль', '_g1'),
        new Note('a', 'Ля', '_a1'),
        new Note('h', 'Си', '_h1'),
        new Note('c', 'До', '_c2'),
        new Note('d', 'Ре', '_d2'),
        new Note('e', 'Ми', '_e2'),
        new Note('f', 'Фа', '_f2'),
        new Note('g', 'Соль', '_g2'),
        new Note('a', 'Ля', '_a2'),
        new Note('h', 'Си', '_h2'),
        new Note('c', 'До', '_c3'),
    ]

    setCurrentNote = (): Note => {
        const note = this.getRandomClassName()
        note.className = 'oval ' + note.className
        return note;
    }

    getRandomClassName = (): Note => {
        const randomIndex = Math.floor(Math.random() * this.notes.length)
        const randomNote = this.notes[randomIndex]
        return randomNote;
    };

    changeNote = (noteDisplayName: string): void => {
        if (noteDisplayName === this.currentNote.displayName) {
            this.score++
            this.indicatorClassName = 'green'
        } else {
            this.score--;
            this.indicatorClassName = 'red'
        }

        let currentNote = this.setCurrentNote()
        while (this.currentNote.className === currentNote.className) {
            currentNote = this.setCurrentNote()
        }
        this.currentNote = currentNote
    }

    notenames: string[] = this.notes.slice(0, 7).map(n => n.displayName);
    currentNote: Note = this.setCurrentNote();

    startGame = (seconds: number): void => {
        if (this.timer > 0) return
        this.setStartValues(seconds)
        const t = setInterval(() => {
            if (this.timer <= 0) {
                clearInterval(t);
                this.resultText = `Игра окончена! Ваш результат: ${this.score}`
                this.isGameOn = false
                return
            }
            this.timer--
        }, 1000);
    };

    stopGame = (): void => {
        this.timer = 0
    }

    setStartValues = (seconds) => {
        this.isGameOn = true
        this.timer = seconds
        this.resultText = ''
        this.score = 0
        this.indicatorClassName = 'blue'
    }
}

