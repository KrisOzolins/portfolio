import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import { Form, Field, ErrorMessage } from 'formik';
import MDEditor, { commands } from '@uiw/react-md-editor';

import Icon from '@/app/admin/_components/Icon';

import 'react-tagsinput/react-tagsinput.css';

const PostForm = ({
  errors,
  values,
  setFieldValue,
  isSubmitting,
  isValid,
  setFieldError,
}: {
  errors: any;
  values: any;
  setFieldValue: any;
  isSubmitting: boolean;
  isValid: boolean;
  setFieldError: (field: string, errorMsg: string) => void;
}) => {
  const [tags, setTags] = useState<string[]>(values.tags || []);

  // console.log(tags);
  // console.log('errors', errors);

  return (
    <>
      {/* <form className="w-1/2" action={`/api/posts`} method="POST"> */}
      {/* <form className="w-1/2" onSubmit={submitPost}> */}
      <Form className="w-1/2">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-white">
            Title
          </label>
          {/* <input
                type="text"
                name="title"
                id="title"
                value={fields.title}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              /> */}
          <Field
            name="title"
            id="title"
            // value={fields.title}
            // onChange={handleChange}
            // onChange={handleChange}
            //  onBlur={handleBlur}
            placeholder="Title"
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md"
            autoFocus
          />
          {/* {errors.title && touched.title ? <div className="text-red-500">{errors.title}</div> : null} */}
          <ErrorMessage name="title" component="div" className="text-red-400 text-sm mt-1" />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-white">
            Tags
          </label>
          <TagsInput
            value={values.tags}
            // onChange={(tags: string[]) => setTags(tags)}
            onChange={(value: any, e: any) => setFieldValue('tags', value, true)}
            className="react-tagsinput !mt-1 !p-1 !focus:ring-indigo-500 !focus:border-indigo-500 !block !w-full !shadow-sm !sm:text-sm !border-gray-600 !rounded-md !border-0"
            tagProps={{
              className: 'react-tagsinput-tag !p-0.5 !px-1 !mb-0 !bg-blue-500 !text-white !border-none',
              classNameRemove: 'react-tagsinput-remove',
            }}
            inputProps={{
              className: 'react-tagsinput-input !p-0.5 !mb-0',
              placeholder: 'Add a tag',
              name: 'tags',
            }}
            // Allows: Uppercase letters, numbers, dots, underscores, plus signs, and hyphens.
            // validationRegex={/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
            // Allow only letters and numbers.
            validationRegex={/^[A-Za-z0-9]+$/}
            onValidationReject={(tags: string[]) => {
              console.log('Invalid tag:', tags);
              // set formik error
              setFieldError('tags', 'Invalid tag. Only letters and numbers are allowed.');
            }}
          />
          {errors.tags ? <div className="text-red-400 text-sm mt-1">{errors.tags}</div> : null}
          {/* <ErrorMessage name="tags" component="div" className="text-red-400 text-sm mt-1" /> */}
        </div>
        <div className="mb-4" data-color-mode="light">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-white">
            Content{' '}
            <small>
              (supports{' '}
              <a
                href="https://www.markdownguide.org/"
                target="_blank"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 underline"
              >
                Markdown
                <Icon name="faExternalLink" className="ms-1" />
              </a>
              )
            </small>
          </label>
          {/* <textarea
            name="content"
            id="content"
            value={fields.content}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md min-h-64"
          ></textarea> */}
          {/* <Field
            as="textarea"
            name="content"
            id="content"
            // value={fields.content}
            // onChange={handleChange}
            // onChange={handleChange}
            //  onBlur={handleBlur}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md min-h-64"
          /> */}
          <MDEditor
            // value={fields.content}
            value={values.content}
            onChange={(value, e) => setFieldValue('content', value, true)}
            hideToolbar
            preview="edit"
            textareaProps={{
              placeholder: 'Post content...',
              // maxLength: 10
            }}
            className="mt-1"
          />
          {/* {errors.content && touched.content ? <div className="text-red-500">{errors.content}</div> : null} */}
          <ErrorMessage name="content" component="div" className="text-red-400 text-sm mt-1" />
        </div>
        {/* archived checkbox */}
        <div className="mb-4">
          <div className="flex items-center">
            <Field
              type="checkbox"
              name="archived"
              id="archived"
              // checked={fields.archived}
              // onChange={handleChange}
              // onChange={handleChange}
              // onBlur={handleBlur}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="archived" className="ml-2 block text-sm font-medium text-gray-700 dark:text-white">
              Archived
            </label>
          </div>
          {/* {errors.archived && touched.archived ? <div className="text-red-500">{errors.archived}</div> : null} */}
          <ErrorMessage name="archived" component="div" className="text-red-400 text-sm mt-1" />
        </div>
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
              disabled={isSubmitting || !isValid}
            >
              Save
            </button>
            {isSubmitting && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
          {/* <Link href={`/admin/posts/${post.id}`} className="text-gray-500 hover:text-gray-600">
            Back
          </Link> */}
        </div>
        {/* </form> */}
      </Form>
    </>
  );
};

export default PostForm;
