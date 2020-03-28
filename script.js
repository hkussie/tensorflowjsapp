// Fetch and filter the data to make sure there are not any null values
async function getData() {
	const carsDataReq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
	const carsData = await carsDataReq.json();
	const cleaned = carsData.map(car => ({
		mpg: car.Miles_per_Gallon,
    	horsepower: car.Horsepower,
	}))
	.filter(car => (car.mpg != null && car.horsepower != null));

	return cleaned; 
}

// Load and plot the original input data that we are going to train on 
async function run() {
  const data = await getData();
  const model = createModel(); 

  const values = data.map(d => ({
    x: d.horsepower,
    y: d.mpg,
  }));

  tfvis.render.scatterplot(
    {name: 'Horsepower v MPG'},
    {values}, 
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300
    }
  );

  tfvis.show.modelSummary({name:'Model Summary', })
}

// Create a function that'll define our model: 
// Create a sequential model that includes a single input layer, and an output layer 
// A bit how the model architecture works: 
// 
// The const model = tf.sequential(); this instantiates a model object, the model is 
// sequential because it's inputs flow straight to its output.
// 
// model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true})); this line adds
// an input layer to our network, which is connected to a dense layer with one hidden unit. A
// dense layer is a type of layer that multiplies its inputs by a matrix (called weights) and then 
// adds a number (called the bias) to the result. As this is the first layer of our network, we need
// to define our inputshape. The input shape is 1 in this case, because we have 1 number as our input, 
// in this case the horsepower of a given car. The units argument sets how large the weight matrix will 
// be in the layer. By setting it to 1, we are saying there will be 1 weight for each of the input features 
// of the data. 
//
// model.add(tf.layers.dense({units: 1, useBias: true})); this line creates our output layer. We set units 
// to 1 because we want to output 1 number. 

let createModel = () => {
	const model = tf.sequential();

	model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));

	model.add(tf.layers.dense({units: 1, useBias: true}));

	return model; 
}

let convertToTensor = (data) => {
	return tf.tidy(() => {
		tf.util.shuffle(data); 

		const inputs = data.map();
		const labels = data.map();
		
	})
}

document.addEventListener('DOMContentLoaded', run);
console.log("Success");