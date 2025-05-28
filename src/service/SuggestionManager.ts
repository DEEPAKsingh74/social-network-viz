import type { Edge } from "vis-network";

export class SuggestionManager {
    private adjacencyList: number[][] = [];
    private edges: Edge[];

    constructor(edges: Edge[]) {
        this.edges = edges;
        this.buildAdjacencyList();
    }

    private buildAdjacencyList() {
        for (const edge of this.edges) {
            const u = edge.from as number;
            const v = edge.to as number;

            if (!this.adjacencyList[u]) this.adjacencyList[u] = [];
            if (!this.adjacencyList[v]) this.adjacencyList[v] = [];

            this.adjacencyList[u].push(v);
            this.adjacencyList[v].push(u); // remove if graph is directed
        }
    }

    public suggest(userId: number): number[] {
        const suggestions = new Set<number>();
        const directConnections = new Set(this.adjacencyList[userId] || []);

        // Traverse direct connections' friends
        for (const friend of directConnections) {
            const friendsOfFriend = this.adjacencyList[friend] || [];

            for (const suggestion of friendsOfFriend) {
                if (
                    suggestion !== userId &&
                    !directConnections.has(suggestion)
                ) {
                    suggestions.add(suggestion);
                }
            }
        }

        return Array.from(suggestions);
    }
}
