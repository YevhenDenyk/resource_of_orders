import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'

const dateTransformer = (date) => {
  return dayjs(date).format('D.MM.YY H:mm');
}

export {dateTransformer}