import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Tooltip } from "antd";
import { usePostStar } from "../../../hooks/mutations/star/usePostStar";
import { useDeleteStar } from "../../../hooks/mutations/star/useDeleteStar";
import { PROMPT_KEYS } from "../../../hooks/queries/QueryKeys";

interface StarButtonProps {
    id: string;
    isFavorite: boolean;
}
export default function StarButton({ id, isFavorite }: StarButtonProps) {
    const queryClient = useQueryClient();

    function handleOnFavoriteClick() {
        if (!id) {
            console.error("No id");
            return;
        }

        if (isFavorite) deleteStar(id);
        else postStar(id);
    }

    const { mutate: postStar } = usePostStar({
        onSuccess: (res) => {
            const { success, detail } = res;

            if (!success) {
                console.error(`${detail}`);
                alert(`${detail}`);
                return;
            }

            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.lists() });
        },
        onError: (error) => {
            console.error(error.message);
        },
    });

    const { mutate: deleteStar } = useDeleteStar({
        onSuccess: (res) => {
            const { success, detail } = res;

            if (!success) {
                console.error(`${detail}`);
                alert(`${detail}`);
                return;
            }

            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.lists() });
        },
        onError: (error) => {
            console.error(error.message);
        },
    });

    return (
        <Tooltip title="favorite">
            <Button
                shape="circle"
                icon={isFavorite ? <StarFilled /> : <StarOutlined />}
                onClick={handleOnFavoriteClick}
            />
        </Tooltip>
    );
}
