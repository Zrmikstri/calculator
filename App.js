// https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function evalEquation(equation) {
	let result = equation;
	try {
		result = Function(`return (${equation})`)();
		// result = eval(equation);
	}
	catch (error) {
		alert(error.message + `\nPlease re-enter your equation`);
	}
	finally {
		return (Math.round(result * 100) / 100).toString();
	}
};

const Calculator = () => {
	const basicButtons = ['Del', 'C', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
	const [expression, setExpression] = useState('');
	// const [result, setResult] = useState('0');

	return (
		<View style={styles.container}>

			<View style={styles.displayContainer}>
				<Text style={styles.outputText}>
					{expression}
				</Text>

				<Text style={styles.outputText}>
					{result}
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				{
					basicButtons.map((number) => (
						<TouchableOpacity
							key={number}
							style={styles.button}
							onPress={() => setExpression(expression + number)}
						>
							<Text style={styles.buttonText}>{number}</Text>
						</TouchableOpacity>
					))
				}
			</View>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		justifyContent: 'center'
	},
	displayContainer: {
		flex: 1,
		boderColor: 'black',
		borderWidth: 2,
	},
	buttonContainer: {
		flex: 4,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	outputText: {
		flex: 1,
		padding: 15,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'right'
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	col: {
		flex: 1,
		flexDirection: 'column',
	},
	button: {
		width: '25%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DDDDDD',
		padding: 15,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	zeroButton: {
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DDDDDD',
		padding: 15,
	}
});

export default Calculator;