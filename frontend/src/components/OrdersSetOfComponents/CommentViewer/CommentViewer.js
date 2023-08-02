import {dateTransformer} from "../../../helpers";

const CommentViewer = ({comment}) => {

    const createdAt = dateTransformer(comment.createdAt);

    return (
        <div>
            <h4>{comment.essenceName} пише:</h4>
            <p>{comment.text}</p>
            <p>Надіслано: {createdAt}</p>
        </div>
    );
};

export {CommentViewer};
