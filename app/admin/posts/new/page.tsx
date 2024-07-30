'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setNotification, setError } from '@/store/slices/appSlice';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from 'formik';

import PostsService from '@/lib/services/Posts';
import { PostValues } from '@/lib/types';
import { schemas } from '@/lib/utils/validation';
import { capitalize, sleep } from '@/helpers';

import Header from '@/app/admin/_components/Header';
import PostForm from '@/app/admin/_components/PostForm';
import Icon from '@/app/admin/_components/Icon';

export default function NewPostPage() {
  // const post = await PostsService.getPost(params.id);

  const router = useRouter();
  const [cookies, setCookie] = useCookies(['jwt']);
  // const [fields, setFields] = useState({
  //   title: '',
  //   content: '',
  // });
  const [initialValues, setInitialValues] = useState({ title: '', content: '', tags: [], archived: false });

  // Redux state.
  const notification = useSelector((state: any) => state.app.notification);
  const error = useSelector((state: any) => state.app.error);
  const dispatch = useDispatch();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   // Check if nested property.
  //   if (name.includes('.')) {
  //     const [outerKey, innerKey] = name.split('.');
  //     setFields((prevFields: any) => ({
  //       ...prevFields,
  //       [outerKey]: {
  //         ...prevFields[outerKey],
  //         [innerKey]: value,
  //       },
  //     }));
  //   } else {
  //     // Not nested.
  //     setFields((prevFields) => ({
  //       ...prevFields,
  //       [name]: value,
  //     }));
  //   }
  // };

  // const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     PostsService.token = cookies.token;
  //     const response = await PostsService.createPost(fields);
  //     console.log('response', response);
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // };

  const submitPost = async (values: PostValues, { setFieldError }: { setFieldError: any }) => {
    await sleep(500);

    try {
      PostsService.token = cookies.jwt;
      const response = await PostsService.createPost(values);
      // Redirect to post page.
      if (response?.id) {
        dispatch(setNotification('Post created successfully.'));
        toast('Post created successfully.', { toastId: 'notification' });
        router.push(`/admin/posts/${response.id}/edit`);
      }
    } catch (error: any) {
      console.error('error', error);
      toast.error(error.message, { toastId: 'error' });
      if (error?.response?.data?.details) {
        // error.response.data.errors.forEach((err: any) => { setFieldError(err.param, err.msg) });
        for (const detail of error.response.data.details) {
          const message = `${capitalize(detail.message.replace(/['"]+/g, ''))}.`;
          setFieldError(detail.context.key, message);
        }
      }
    }
  };

  return (
    <>
      <Header
        title={`New Post`}
        actions={
          <Link href={`/admin/posts`} className="text-gray-500 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
            <Icon name="faChevronLeft" className="me-1" />
            Back
          </Link>
        }
      />
      <section className="mt-6">
        <div className="flex flex-col justify-start items-center gap-6 text-gray-600">
          {/* <form className="w-1/2" onSubmit={submitPost} action={`/api/posts`} method="POST">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={fields.title}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                value={fields.content}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            </div>
          </form> */}
          <Formik initialValues={initialValues} enableReinitialize validationSchema={schemas.PostSchema} onSubmit={submitPost}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid, setFieldValue, setFieldError }: any) => (
              <>
                <PostForm
                  errors={errors}
                  values={values}
                  setFieldValue={setFieldValue}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  setFieldError={setFieldError}
                />
              </>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}
