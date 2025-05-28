import type { NodeLocation } from "./NodeLocation";

export class Node {
    private id: number;
    private name: string;
    private size: number;
    private borderColor: string;
    private fillColor: string;
    private location: NodeLocation;

    constructor(
        id: number,
        name: string,
        size: number,
        borderColor: string,
        fillColor: string,
        location: NodeLocation
    ) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.location = location;
    }

    // Getters
    getName(): string {
        return this.name;
    }

    getId(): number {
        return this.id;
    }

    getSize(): number {
        return this.size;
    }

    getBorderColor(): string {
        return this.borderColor;
    }

    getFillColor(): string {
        return this.fillColor;
    }

    getLocation(): NodeLocation {
        return this.location;
    }

    // Setters
    setName(name: string): void {
        this.name = name;
    }

    setSize(size: number): void {
        this.size = size;
    }

    setBorderColor(color: string): void {
        this.borderColor = color;
    }

    setFillColor(color: string): void {
        this.fillColor = color;
    }

    setLocation(location: NodeLocation): void {
        this.location = location;
    }
}
