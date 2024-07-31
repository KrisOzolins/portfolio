import * as Yup from 'yup';

const PostSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  content: Yup.string().required('Content is required.'),
  tags: Yup.array().of(Yup.string()),
  archived: Yup.boolean().default(false),
});

export const schemas = {
  PostSchema,
};

export default { schemas };
