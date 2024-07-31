'use client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FormEventHandler, useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setNotification, setError } from '@/store/slices/appSlice';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from 'formik';

import PostsService from '@/lib/services/Posts';
import type { PostValues } from '@/lib/types';
import { schemas } from '@/lib/utils/validation';
import { capitalize, sleep } from '@/helpers';

import Header from '@/app/admin/_components/Header';
import PostForm from '@/app/admin/_components/PostForm';
import Icon from '@/app/admin/_components/Icon';

import 'react-toastify/dist/ReactToastify.css';

export default function EditPostPage({ params }: { params: { id: string } }) {
  // const post = await PostsService.getPost(params.id);

  const [cookies, setCookie] = useCookies(['jwt']);
  const [post, setPost]: any = useState({});
  // const [fields, setFields] = useState({
  //   title: '',
  //   content: '',
  // });
  const [initialValues, setInitialValues] = useState<PostValues>({ title: '', content: '', tags: [], archived: false });

  // Redux state.
  const user = useSelector((state: any) => state.app.user); // state.auth.user
  const notification = useSelector((state: any) => state.app.notification);
  const error = useSelector((state: any) => state.app.error);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (user.role !== 'admin') {
    //   redirect('/admin');
    // }

    const fetchPost = async () => {
      const post = await PostsService.getPost(params.id);

      setPost(post);
      // setFields(post);
      setInitialValues({
        title: post.title,
        content: post.content,
        tags: post.tags,
        archived: post.archived,
      });

      if (notification) {
        // console.log('state notification', notification);
        // toast(notification.message, {
        //   type: notification.type,
        // });
        // toast(notification, {toastId: 'notification'});
        // dispatch(setNotification(null));
      }
    };

    fetchPost();
  }, []);

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
  //     console.log(fields);
  //     PostsService.token = cookies.token;
  //     const response = await PostsService.updatePost(post.id, fields);
  //     console.log('response', response);
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // };

  const submitPost = async (values: PostValues, { setFieldError }: { setFieldError: any }) => {
    if (process.env.NODE_ENV !== 'production') {
      await sleep(500);
    }

    try {
      PostsService.token = cookies.jwt;
      const response = await PostsService.updatePost(post.id, values);
      if (response?.id) {
        toast.success('Post updated successfully.', { toastId: 'notification' });
      }
    } catch (error: any) {
      console.error('error', error);
      // console.log(error.response.data);
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
        title={`Edit Post: ${post.title}`}
        actions={
          <Link href={`/admin/posts/${post.id}`} className="text-gray-500 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
            <Icon name="faChevronLeft" className="me-1" />
            Back
          </Link>
        }
      />
      <section className="mt-6">
        <div className="flex flex-col justify-start items-center gap-6 text-gray-600">
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
