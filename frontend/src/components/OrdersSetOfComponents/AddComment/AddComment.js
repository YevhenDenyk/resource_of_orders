import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch} from "react-redux";

import {orderAction} from "../../../redux";
import {commentService} from "../../../services";
import {commentsValidator} from "../../../validators";

const AddComment = ({orderId}) => {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isValid}
    } = useForm({resolver: joiResolver(commentsValidator), mode: "onSubmit"});

    const submit = async (commit) => {
        try {
            const newComment = {...commit, order: orderId}
            const {data} = await commentService.createComment(newComment);
            dispatch(orderAction.setNewComment(data))
            reset()
        } catch (e) {
////додати обробку помилок
        }
    }

    return (
        <div>
            <h2>Додати коментар</h2>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'comment'} {...register('text')}/>
                {errors.text && <span>{errors.text.message}</span>}
                <button disabled={!isValid}>Send</button>
            </form>
        </div>
    );
};

export {AddComment};