from flask import Flask, request, jsonify
from PIL import Image
from urllib.request import *
import pytesseract
from PIL import Image
import datetime
import cv2
import sys
import os
import os.path
import re
import numpy as np
from tensorflow.keras.layers import Dense, Dropout, Input
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten
from tensorflow.keras.models import Model
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical
import tensorflow as tf


# your path may be different
pytesseract.pytesseract.tesseract_cmd = 'C:\Program Files\Tesseract-OCR\ tesseract.exe'

app = Flask(__name__)


@app.route('/report_verify', methods=['POST'])
def report_verify():
    url = request.json["url"]
    acv = Covid_Report_Validator(url)
    d = acv.is_covid_report()
    return jsonify(d)


class Text_Extractor():
    # Constructor
    def __init__(self, image_file):
        self.image_file = image_file
        if self is None:
            return 0

# Function to extract the text from image as string
    def extract_text(self):
        img = np.asarray(self.image_file)
        #img = Image.open(self.image_file)
        #img = cv2.imread(self.image_file)
        # resize the image
        img = cv2.resize(img, None, fx=2, fy=2,
                         interpolation=cv2.INTER_CUBIC)
        # convert the image to gray
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        text = pytesseract.image_to_string(
            img)
        return text


if __name__ == "__main__":
    app.run(port=8000, debug=True)


def upload():
    target = os.path.join(APP_ROOT, 'static/images/')

    # create image directory if not found
    if not os.path.isdir(target):
        os.mkdir(target)

    # retrieve file from html file-picker
    upload = request.files.getlist("file")[0]
    print("File name: {}".format(upload.filename))
    filename = upload.filename

    # file support verification
    ext = os.path.splitext(filename)[1]
    if (ext == ".jpg") or (ext == ".png") or (ext == ".bmp"):
        print("File accepted")
    else:
        return render_template("error.html", message="The selected file is not supported"), 400

    # save file
    destination = "/".join([target, filename])
    print("File saved to to:", destination)
    upload.save(destination)

    # forward to processing page
    return render_template("processing.html", image_name=filename)


def rcnn():
    num_labels = len(np.unique(y_train))


y_train = to_categorical(y_train)
y_test = to_categorical(y_test)

# reshape and normalize input images
image_size = x_train.shape[1]
x_train = np.reshape(x_train, [-1, image_size, image_size, 1])
x_test = np.reshape(x_test, [-1, image_size, image_size, 1])
x_train = x_train.astype('float32') / 255
x_test = x_test.astype('float32') / 255

# network parameters
input_shape = (image_size, image_size, 1)
batch_size = 128
kernel_size = 3
filters = 64
dropout = 0.3

# use functional API to build cnn layers
inputs = Input(shape=input_shape)
y = Conv2D(filters=filters,
           kernel_size=kernel_size,
           activation='relu')(inputs)
y = MaxPooling2D()(y)
y = Conv2D(filters=filters,
           kernel_size=kernel_size,
           activation='relu')(y)
y = MaxPooling2D()(y)
y = Conv2D(filters=filters,
           kernel_size=kernel_size,
           activation='relu')(y)
# image to vector before connecting to dense layer
y = Flatten()(y)
# dropout regularization
y = Dropout(dropout)(y)
outputs = Dense(num_labels, activation='softmax')(y)

# build the model by supplying inputs/outputs
model = Model(inputs=inputs, outputs=outputs)
# network model in text
model.summary()

# classifier loss, Adam optimizer, classifier accuracy
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

# train the model with input images and labels
model.fit(x_train,
          y_train,
          validation_data=(x_test, y_test),
          epochs=20,
          batch_size=batch_size)

# model accuracy on test dataset
score = model.evaluate(x_test,
                       y_test,
                       batch_size=batch_size,
                       verbose=0)
print("\nTest accuracy: %.1f%%" % (100.0 * score[1]))


class Covid_Report_Validator():
    # Constructor
    def __init__(self, text):
        # Function to validate if an image contains text showing its an aadhar card
        self.text = text

    def is_covid_report(self):
        self.text = text

        if 'png' in self.text:
            return True
        else:
            return False


def rotate():
    # retrieve parameters from html form
    angle = request.form['angle']
    filename = request.form['image']

    # open and process image
    target = os.path.join(APP_ROOT, 'static/images')
    destination = "/".join([target, filename])

    img = Image.open(destination)
    img = img.rotate(-1*int(angle))

    # save and return image
    destination = "/".join([target, 'temp.png'])
    if os.path.isfile(destination):
        os.remove(destination)
    img.save(destination)

    return send_image('temp.png')


@app.route("/flip", methods=["POST"])
def flip():

    # retrieve parameters from html form
    if 'horizontal' in request.form['mode']:
        mode = 'horizontal'
    elif 'vertical' in request.form['mode']:
        mode = 'vertical'
    else:
        return render_template("error.html", message="Mode not supported (vertical - horizontal)"), 400
    filename = request.form['image']

    # open and process image
    target = os.path.join(APP_ROOT, 'static/images')
    destination = "/".join([target, filename])

    img = Image.open(destination)

    if mode == 'horizontal':
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
    else:
        img = img.transpose(Image.FLIP_TOP_BOTTOM)

    # save and return image
    destination = "/".join([target, 'temp.png'])
    if os.path.isfile(destination):
        os.remove(destination)
    img.save(destination)

    return send_image('temp.png')


# crop filename from (x1,y1) to (x2,y2)
@app.route("/crop", methods=["POST"])
def crop():
    # retrieve parameters from html form
    x1 = int(request.form['x1'])
    y1 = int(request.form['y1'])
    x2 = int(request.form['x2'])
    y2 = int(request.form['y2'])
    filename = request.form['image']

    # open image
    target = os.path.join(APP_ROOT, 'static/images')
    destination = "/".join([target, filename])

    img = Image.open(destination)

    # check for valid crop parameters
    width = img.size[0]
    height = img.size[1]

    crop_possible = True
    if not 0 <= x1 < width:
        crop_possible = False
    if not 0 < x2 <= width:
        crop_possible = False
    if not 0 <= y1 < height:
        crop_possible = False
    if not 0 < y2 <= height:
        crop_possible = False
    if not x1 < x2:
        crop_possible = False
    if not y1 < y2:
        crop_possible = False

    # crop image and show
    if crop_possible:
        img = img.crop((x1, y1, x2, y2))

        # save and return image
        destination = "/".join([target, 'temp.png'])
        if os.path.isfile(destination):
            os.remove(destination)
        img.save(destination)
        return send_image('temp.png')
    else:
        return render_template("error.html", message="Crop dimensions not valid"), 400
    return '', 204


# blend filename with stock photo and alpha parameter
@app.route("/blend", methods=["POST"])
def blend():
    # retrieve parameters from html form
    alpha = request.form['alpha']
    filename1 = request.form['image']

    # open images
    target = os.path.join(APP_ROOT, 'static/images')
    filename2 = 'blend.jpg'
    destination1 = "/".join([target, filename1])
    destination2 = "/".join([target, filename2])

    img1 = Image.open(destination1)
    img2 = Image.open(destination2)

    # resize images to max dimensions
    width = max(img1.size[0], img2.size[0])
    height = max(img1.size[1], img2.size[1])

    img1 = img1.resize((width, height), Image.ANTIALIAS)
    img2 = img2.resize((width, height), Image.ANTIALIAS)

    # if image in gray scale, convert stock image to monochrome
    if len(img1.mode) < 3:
        img2 = img2.convert('L')

    # blend and show image
    img = Image.blend(img1, img2, float(alpha)/100)

    # save and return image
    destination = "/".join([target, 'temp.png'])
    if os.path.isfile(destination):
        os.remove(destination)
    img.save(destination)

    return send_image('temp.png')


# retrieve file from 'static/images' directory
@app.route('/static/images/<filename>')
def send_image(filename):
    return send_from_directory("static/images", filename)


class Model(object):

    def __init__(self, config, is_train=True):
        self.is_train = is_train
        self.emb_size = config['emb_size']
        self.batch_size = config['batch_size']
        self.num_kernel = config['num_kernel']
        self.min_window = config['min_window']
        self.max_window = config['max_window']
        self.vocab_size = config['vocab_size']
        self.num_classes = config['num_classes']
        self.sent_len = config['sent_len']
        self.l2_reg = config['l2_reg']
        if is_train:
            self.optimizer = config['optimizer']
            self.dropout = config['dropout']
        self.build_graph()

    def build_graph(self):
        """ Build the computation graph. """
        self._inputs = tf.placeholder(
            dtype=tf.int64, shape=[None, self.sent_len], name='input_x')
        self._labels = tf.placeholder(dtype=tf.float32, shape=[
                                      None, self.num_classes], name='input_y')
        losses = []

        # lookup layer
        with tf.variable_scope('embedding') as scope:
            self._W_emb = _variable_on_cpu(name='embedding', shape=[self.vocab_size, self.emb_size],
                                           initializer=tf.random_uniform_initializer(minval=-1.0, maxval=1.0))
            # sent_batch is of shape: (batch_size, sent_len, emb_size, 1), in order to use conv2d
            sent_batch = tf.nn.embedding_lookup(
                params=self._W_emb, ids=self._inputs)
            sent_batch = tf.expand_dims(sent_batch, -1)

        # conv + pooling layer
        pool_tensors = []
        for k_size in range(self.min_window, self.max_window+1):
            with tf.variable_scope('conv-%d' % k_size) as scope:
                kernel, wd = _variable_with_weight_decay(
                    name='kernel_%d' % k_size,
                    shape=[k_size, self.emb_size, 1, self.num_kernel],
                    initializer=tf.truncated_normal_initializer(stddev=0.01),
                    wd=self.l2_reg)
                losses.append(wd)
                conv = tf.nn.conv2d(input=sent_batch, filter=kernel, strides=[
                                    1, 1, 1, 1], padding='VALID')
                biases = _variable_on_cpu(
                    'biases_'+str(k_size), [self.num_kernel], tf.constant_initializer(0.0))
                bias = tf.nn.bias_add(conv, biases)
                relu = tf.nn.relu(bias, name=scope.name)
                # shape of relu: [batch_size, conv_len, 1, num_kernel]
                conv_len = relu.get_shape()[1]
                pool = tf.nn.max_pool(relu, ksize=[1, conv_len, 1, 1], strides=[
                                      1, 1, 1, 1], padding='VALID')
                # shape of pool: [batch_size, 1, 1, num_kernel]
                # pool = tf.squeeze(pool,squeeze_dims=[1,2]) # size: [batch_size, num_kernel]
                pool_tensors.append(pool)

        # Combine all pooled tensors
        num_windows = self.max_window - self.min_window + 1
        pool_size = num_windows * self.num_kernel
        pool_layer = tf.concat(pool_tensors, num_windows, name='pool')
        pool_flat = tf.reshape(pool_layer, [-1, pool_size])

        # drop out layer
        if self.is_train and self.dropout > 0:
            pool_dropout = tf.nn.dropout(pool_flat, 1 - self.dropout)
        else:
            pool_dropout = pool_flat

        # fully-connected layer
        with tf.variable_scope('output') as scope:
            W, wd = _variable_with_weight_decay('W', shape=[pool_size, self.num_classes],
                                                initializer=tf.truncated_normal_initializer(stddev=0.05), wd=self.l2_reg)
            losses.append(wd)
            biases = _variable_on_cpu('biases', shape=[self.num_classes],
                                      initializer=tf.constant_initializer(0.01))
            self.logits = tf.nn.bias_add(
                tf.matmul(pool_dropout, W), biases, name='logits')

        # loss
        with tf.variable_scope('loss') as scope:
            cross_entropy = tf.nn.softmax_cross_entropy_with_logits(logits=self.logits, labels=self._labels,
                                                                    name='cross_entropy_per_example')
            cross_entropy_loss = tf.reduce_mean(
                cross_entropy, name='cross_entropy_loss')
            losses.append(cross_entropy_loss)
            self._total_loss = tf.add_n(losses, name='total_loss')
            # self._total_loss = cross_entropy_loss

        # correct prediction count
        with tf.variable_scope('true_count') as scope:
            correct_predictions = tf.equal(
                tf.argmax(self.logits, 1), tf.argmax(self._labels, 1))
            #self.accuracy = tf.reduce_mean(tf.cast(correct_predictions, tf.float32))
            #correct_predictions = tf.cast(tf.nn.in_top_k(self.logits, self._labels, 1), tf.int32)
            self._true_count_op = tf.reduce_sum(
                tf.cast(correct_predictions, tf.int32))

        # train on a batch
        self._lr = tf.Variable(0.0, trainable=False)
        if self.is_train:
            if self.optimizer == 'adadelta':
                opt = tf.train.AdadeltaOptimizer(self._lr)
            elif self.optimizer == 'adagrad':
                opt = tf.train.AdagradOptimizer(self._lr)
            elif self.optimizer == 'adam':
                opt = tf.train.AdamOptimizer(self._lr)
            elif self.optimizer == 'sgd':
                opt = tf.train.GradientDescentOptimizer(self._lr)
            else:
                raise ValueError("Optimizer not supported.")
            grads = opt.compute_gradients(self._total_loss)
            self._train_op = opt.apply_gradients(grads)

            for var in tf.trainable_variables():
                tf.summary.histogram(var.op.name, var)
        else:
            self._train_op = tf.no_op()

        return

    @property
    def inputs(self):
        return self._inputs

    @property
    def labels(self):
        return self._labels

    @property
    def lr(self):
        return self._lr

    @property
    def train_op(self):
        return self._train_op

    @property
    def total_loss(self):
        return self._total_loss

    # @property
    # def accuracy(self):
    #    return self.accuracy

    @property
    def true_count_op(self):
        return self._true_count_op

    @property
    def scores(self):
        return self.logits

    @property
    def W_emb(self):
        return self._W_emb

    def assign_lr(self, session, lr_value):
        session.run(tf.assign(self.lr, lr_value))

    def assign_embedding(self, session, pretrained):
        session.run(tf.assign(self.W_emb, pretrained))
