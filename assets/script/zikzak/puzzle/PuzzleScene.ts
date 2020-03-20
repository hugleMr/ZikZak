import { STATE } from "./PuzzleConstants";
import { PuzzleBoard } from "./PuzzleBoard";
import { G } from "../G";
import { Timer } from "../shared/Timer";

const { ccclass, property } = cc._decorator;

@ccclass
export class PuzzleScene extends cc.Component {

    @property(PuzzleBoard)
    private board: PuzzleBoard = null;
    @property(Timer)
    private timer: Timer = null;
    @property(cc.Node)
    private winPanel: cc.Node = null;

    private level: number = 3;
    public state: STATE = STATE.NONE;

    start() {
        this.addListeners();
        this.board.init(this);
        this.startGame();
    }

    private startGame() {
        this.winPanel.active = false;
        this.state = STATE.START;
        this.board.reset(this.level);
        this.timer.reset();
        this.timer.run();
    }

    private overGame() {
        this.winPanel.active = true;
        this.state = STATE.OVER;
        this.timer.stop();
        G.gameRoot.showMaskMessage("You insisted" + this.timer.time.toFixed(1) + "second", { label: ":v" });
    }

    public onBoardTouch(x: number, y: number) {
        // if (this.state = STATE.START) {
        //     let locate = this.board.getLocationOfBlank();
        //     this.board.movePiece(locate.x, locate.y);
        //     if (this.board.judgeWin()) {
        //         this.overGame();
        //     }
        // }
    }

    public onJoinStickTouch(event,direction) {
        console.log("xxx : ",direction);
        if (this.state = STATE.START) {
            let locate = this.board.getLocationOfBlank();
            if(locate.x < 0){
                return;
            }
            this.board.movePiece(direction,locate.x, locate.y);
            if (this.board.judgeWin()) {
                this.overGame();
            }
        }
    }

    public onBtnLevelEasy() {
        this.level = 3;
        this.startGame();
    }

    public onBtnLevelNormal() {
        this.level = 5;
        this.startGame();
    }

    public onBtnLevelHard() {
        this.level = 10;
        this.startGame();
    }

    onBtnReturn() {
        G.returnHall();
    }

    onBtnRestart() {
        this.startGame();
    }

    private addListeners() {

    }

    private removeListeners() {

    }

}
