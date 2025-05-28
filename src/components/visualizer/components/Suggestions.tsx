import { useUserListStore } from "../../../store/useUserListStore";
import { useEdgesStore } from "../../../store/useEdgesStore";
import { useUserStore } from "../../../store/useUserStore";
import UserCard from "./UserCard";
import { SuggestionManager } from "../../../service/SuggestionManager";
import { useNodesStore } from "../../../store/useNodesStore";
import { useEffect, useMemo } from "react";

const Suggestions = () => {
    const { users } = useUserListStore();
    const { edges } = useEdgesStore();
    const { colorClosestNodes, resetNodeColors } = useNodesStore();
    const { user } = useUserStore();

    if (!user) {
        return (
            <div className="text-black/50 text-sm p-4">
                Please log in to see suggestions.
            </div>
        );
    }

    const suggestedUserIds = useMemo(() => {
        const suggestionManager = new SuggestionManager(edges);
        return suggestionManager.suggest(user.id);
    }, [edges, user.id]);



    // color the closest nodes.
    useEffect(() => {
        resetNodeColors()
        colorClosestNodes(suggestedUserIds);
    }, [suggestedUserIds, colorClosestNodes, user, resetNodeColors]);

    const suggestedUsers = users.filter((u) => suggestedUserIds.includes(u.id));

    return (
        <div className="overflow-y-auto overflow-x-hidden h-[100vh] px-4">
            <h1 className="my-6 font-bold text-black/70">Suggestions</h1>

            { suggestedUsers.length > 0 ? (
                suggestedUsers.map((item) => (
                    <UserCard key={item.id} user={item} />
                ))
            ) : (
                <div className="text-black/50 text-sm">
                    No suggestions found yet. Try following more users.
                </div>
            )}
        </div>
    );
};

export default Suggestions;
