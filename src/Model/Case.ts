import { Scene, AbstractMesh, ActionManager, Vector3, ExecuteCodeAction, Color3 } from "babylonjs";
import { ConstructionCollection } from "./ConstructionCollection";
import { Container } from "../Container";
import { Pion } from "./Pion";
import { EmitterInterface, Emitter, EmitterListener } from "../Infrastructure/Emitter/Emitter";
import { Construction } from "../Model/Construction";
import { Etage } from "./Etage";
import { Dome } from "./Dome";

export class Case implements EmitterInterface
{
    private mesh: AbstractMesh;
    private constructions: ConstructionCollection = new ConstructionCollection;
    private inPion: Pion | null = null;
    private emitter = new Emitter;
    private actions: {hover: ExecuteCodeAction, unhover: ExecuteCodeAction, click: ExecuteCodeAction};
    private lightGlowActive: boolean = false;

    constructor (
        private scene: Scene,
        public coordonnees: {x: number, y: number},
    ) {
        const caseName = "case"+this.coordonnees.x+this.coordonnees.y;
        this.mesh = Container.loadMesh(caseName, 'case');
        this.mesh.position = new Vector3(3.1 * (this.coordonnees.x - 1) - 6.2, 0, 3.1 * (this.coordonnees.y - 1) - 6.2);
        this.mesh.actionManager = new ActionManager(this.scene);

        this.actions = {
            hover: new ExecuteCodeAction(
                ActionManager.OnPointerOverTrigger,
                () => {
                    this.glow();
                }
            ),
            unhover: new ExecuteCodeAction(
                ActionManager.OnPointerOutTrigger,
                () => {
                    if (this.lightGlowActive) {
                        this.lightGlow();
                    } else {
                        this.unGlow();
                    }
                }
            ),
            click: new ExecuteCodeAction(
                ActionManager.OnPickTrigger,
                () => {
                    this.emit('click', this);
                }
            ),
        };
    }

    private distanceDe (caze: Case): number {
        return Math.max(
            Math.abs(caze.coordonnees.x - this.coordonnees.x),
            Math.abs(caze.coordonnees.y - this.coordonnees.y),
        );
    }

    get niveau (): number {
        return this.constructions.niveau;
    }

    get estDuPerimetre (): boolean {
        return this.coordonnees.x == 1 || this.coordonnees.x == 5 || this.coordonnees.y == 5 || this.coordonnees.y == 1;
    }

    public get y(): number {
        if (this.constructions.dernierEtage === null) {
            return this.mesh.getBoundingInfo().boundingBox.maximumWorld.y;
        }

        return this.constructions.dernierEtage.minimumY;
    }

    get positionPosePion(): Vector3 {
        const pionPosition = this.mesh.position.clone();
        pionPosition.y = this.y;
        return pionPosition;
    }

    get estComplete (): boolean {
        return this.constructions.complet();
    }

    get aUnDome(): boolean {
        return this.constructions.aUnDome();
    }

    get estOccupée (): boolean {
        return this.inPion !== null && !this.aUnDome;
    }

    get position (): Vector3 {
        return this.mesh.position.clone();
    }

    lightGlow () {
        this.mesh.renderOverlay = false;
        this.mesh.renderOutline = true;
        this.mesh.outlineColor = new Color3(0.56, 0.56, 1);
        this.mesh.outlineWidth = 0.04;
    }

    glow () {
        this.mesh.renderOutline = true;
        this.mesh.outlineColor = new Color3(0.56, 0.56, 1);
        this.mesh.outlineWidth = 0.045;
        this.mesh.renderOverlay = true;
        this.mesh.overlayColor = new Color3(0.2, 0.2, 0.6);
    }

    unGlow() {
        this.mesh.renderOutline = false;
        this.mesh.renderOverlay = false;
    }

    enableClickable(lightGlow: boolean) {
        this.lightGlowActive = lightGlow;
        if (this.mesh.actionManager) {
            this.mesh.actionManager.registerAction(this.actions.hover);
            this.mesh.actionManager.registerAction(this.actions.unhover);
            this.mesh.actionManager.registerAction(this.actions.click);
            this.constructions.enableClickable();
            if(lightGlow) {
                this.lightGlow();
            }
        }
    }

    disableClickable() {
        if (this.mesh.actionManager) {
            this.mesh.actionManager.unregisterAction(this.actions.hover);
            this.mesh.actionManager.unregisterAction(this.actions.unhover);
            this.mesh.actionManager.unregisterAction(this.actions.click);
            this.constructions.disableClickable();
            this.unGlow();
        }
    }

    construire (): void {
        if (this.estOccupée) {
            throw "On ne peut pas construire sur une case occupée";
        }
        
        const etage = this.prochainEtage();

        if (etage === null) {
            throw "Plus de construction possible";
        }

        etage.on('click', () => {
            this.emit('click', this);
        });
        etage.on('hover', () => {
            this.emit('hover', this);
        });
        etage.on('unhover', () => {
            this.emit('unhover', this);
        });

        this.constructions.add(etage);
    }

    detruire () {
        this.constructions.removeLast();
    }

    construireSousLePion (): void {
        const etage = this.prochainEtage();

        if (etage === null) {
            throw "Plus de construction possible";
        }

        etage.on('click', () => {
            this.emit('click', this);
        });
        etage.on('hover', () => {
            this.emit('hover', this);
        });
        etage.on('unhover', () => {
            this.emit('unhover', this);
        });

        this.constructions.add(etage);

        this.inPion?.déplacerSur(this);
    }

    poser(pion: Pion): void {
        pion.déplacerSur(this);
        this.inPion = pion;
    }

    libérer (): void {
        this.inPion = null;
    }

    differenceDeNiveauAvec (caze: Case): number {
        return this.constructions.niveau - caze.constructions.niveau;
    }

    avoisine (caze: Case): boolean {
        return this.distanceDe(caze) === 1;
    } 
    
    private prochainEtage(): Construction | null {
        switch (this.niveau) {
            case 0:
                return new Etage(this.scene, 1, this);
            case 1:
                return new Etage(this.scene, 2, this);
            case 2:
                return new Etage(this.scene, 3, this);
            case 3:
                return new Dome(this.scene, this, 4);
            case 4:
                return null;
            default:
                throw "wut";
        }
    }
    
    on (event: string, f: EmitterListener): EventListener {
        return this.emitter.on(event, f);
    }

    off (event: string, f: EmitterListener): void {
        return this.emitter.off(event, f);
    }

    emit (event: string, ...vars: any[]) {
        this.emitter.emit(event, ...vars);
    }

    flush (): void {
        this.emitter.flush();
    }
}