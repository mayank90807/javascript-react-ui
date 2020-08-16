/* eslint-disable no-unused-vars */
import React from 'react';
import { TextField, Slider, SelectField } from '../../components/index';
import {
  PUBLIC_IMAGE_FOLDER, LOAD_BALANCER_IMAGE, FULL_STACK_IMAGE,
  JS_IMAGE, DNS_SERVER_IMAGE, CLOUD_IMAGE,
} from '../../configs/constant';

const TextFieldDemo = () => (
  <div style={{ margin: '30px' }}>
    <Slider test="name" height={200} banners={[LOAD_BALANCER_IMAGE, FULL_STACK_IMAGE, JS_IMAGE, DNS_SERVER_IMAGE, CLOUD_IMAGE]} />
    <h4>This is a Disabled Input</h4>
    <TextField disabled defaultValue="Disabled Input" />
    <h4>This is a Valid Input </h4>
    <TextField error="false" defaultValue="Accessible Input " />
    <h4>A input with errors</h4>
    <TextField error="true" defaultValue="101" />
    <p style={{ color: 'red' }}> Could not be greater than</p>
  </div>

);
export default TextFieldDemo;
