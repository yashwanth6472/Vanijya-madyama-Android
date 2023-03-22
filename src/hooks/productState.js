import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Product, Payment, Orders} from '../Service/apiService';
import authState from './authState';
import {productReviewInfo} from '../Components/commonComp/constants';
import {useDispatch, useSelector} from 'react-redux';
import {setProductById} from '../actions/product';
import RazorpayCheckout from 'react-native-razorpay';
import {err} from 'react-native-svg/lib/typescript/xml';
const productState = () => {
  const dispatch = useDispatch();
  //const {} = useSelector(state => state.user)
  const {handleValidation, extractFormDATA} = authState();
  const [commentForm, setCommentForm] = useState(productReviewInfo);
  const [paymentStatus, setPaymentStatus] = useState(false);
  //START HANDLE FUNCTIONS

  const handleCommentInput = (name, value) => {
    const x = {...commentForm};
    x[name] = {
      ...x[name],
      text: value,
      error: handleValidation(name, value),
    };
    setCommentForm(x);
  };

  //END HANDLE FUNCTIONS

  //START GET REQUEST
  const getAllProducts = async () => {
    try {
      const res = await Product.allProducts();

      if (res.status != 200) {
        throw Error(res.message);
      }
      return res;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const getProductById = async itemId => {
    try {
      const res = await Product.productById(itemId);

      return res;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const getProductReview = async id => {
    try {
      const res = await Product.getProductReview(id);
      if (res.status != 200) {
        throw Error(res.error);
      }
      return res;
    } catch (error) {
      throw Error(error.message);
    }
  };
  //END GET REQUEST

  //START POST REQUEST

  const postReviewComment = async id => {
    try {
      try {
        let x = {...commentForm};
        let error = '';

        for (const [mainKey, mainValue] of Object.entries(commentForm)) {
          if (mainValue.text.length == 0) {
            error = true;
          }
          if (mainValue.error.length != 0) {
            error = true;
          }
        }

        if (error) throw Error('Required all the fields');
        const data = extractFormDATA(commentForm);
        console.log('extracted form data from comment form ', data);

        const res = await Product.createProductReview(id, data);
        if (res.status != 200) {
          throw Error(res.message);
        }
        return res;
      } catch (error) {
        throw Error(error.message);
      }
    } catch (error) {}
  };

  //END POST REQUEST

  //START custom Function
  const onPressSpecificItem = async (itemId, navigation, categorie) => {
    try {
      const getRes = await getProductById(itemId);
      dispatch(setProductById(getRes.data.result));
      // const getRes1 = await getProductReview(productId);
      // dispatch(setAllProductReviews())
      navigation.navigate('header', {
        screen: 'singleProduct',
        params: {item: itemId, type: categorie},
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
  //END custom Function

  const paymentOptions = async (
    currency,
    customer_id,
    customerName,
    customerPhone,
    customerEmail,
    cutsomerAdress,
    orderList,
    navigation,
    savedPrice,
  ) => {
    console.log(orderList);
    try {
      const res = await Payment.getPaymentOrder({amount: currency});
      if (res.status != 200) {
        throw Error(res);
      }
      let orderId = res.data.result.id;
      let amount = res.data.result.amount;
      let amount_due = res.data.result.amount_due;
      let amount_paid = res.data.result.amount_paid;

      const options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_2uPdAjL6whU8zO',
        amount: amount,
        name: 'Vanijya Madyama',
        order_id: orderId, //Replace this with an order_id created using Orders API.
        prefill: {
          email: customerEmail,
          contact: customerPhone,
          name: customerName,
        },
        //customer_id: customer_id,
        remember_customer: true,
        send_sms_hash: true,
      };
      RazorpayCheckout.open(options)
        .then(async data => {
          console.log(`payment success ${data}`, data);
          let razorpay_order_id = data.razorpay_order_id;
          let razorpay_payment_id = data.razorpay_payment_id;
          let razorpay_payment_signature_id = data.razorpay_signature;

          //setPaymentStatus(true)
          const res = await Orders.createOrder({
            shippingInfo: cutsomerAdress,
            payment_id: razorpay_payment_id,
            payment_order_id: razorpay_order_id,
            orderItems: orderList,
            totalPrice: amount,
          });

          console.log('---------------> Orders', res);
          navigation.navigate('success', {savedPrice: savedPrice});
        })
        .catch(error => {
          setPaymentStatus(false);
          console.log(`Error: ${error}`, error);
        });
      console.log(res);
    } catch (error) {
      throw Error(error.message);
    }
  };
  return {
    commentForm: commentForm,

    getAllProducts: getAllProducts,
    getProductById: getProductById,
    postReviewComment: postReviewComment,
    handleCommentInput: handleCommentInput,
    getProductReview: getProductReview,
    onPressSpecificItem: onPressSpecificItem,
    paymentOptions: paymentOptions,
    paymentOptions: paymentOptions,
  };
};

export default productState;
