import { NodeLocation } from "../entity/NodeLocation";

export function getSpiralNodePosition(
    index: number,
    spacing = 80,
    centerX = 400,
    centerY = 300
): NodeLocation {
    const angle = index * 0.8; // Radians; tweak for spacing
    const radius = spacing + spacing * Math.sqrt(index);

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return new NodeLocation(x, y);
}
