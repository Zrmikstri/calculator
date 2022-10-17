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
	const basicNumbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'];

	const [expression, setExpression] = useState('');
	const [result, setResult] = useState('0');
	const onPress = (value) => setExpression(expression + value);

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

			<View style={styles.col}>
				<View style={styles.row}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => { setExpression(expression.slice(0, -1)); }}
					>
						<Text style={styles.buttonText}>Del</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={() => setExpression('')}>
						<Text style={styles.buttonText}>Clear</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={() => onPress('/')}>
						<Text style={styles.buttonText}>/</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity style={styles.button} onPress={() => onPress('7')}>
						<Text style={styles.buttonText}>7</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('8')}>
						<Text style={styles.buttonText}>8</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('9')}>
						<Text style={styles.buttonText}>9</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('*')}>
						<Text style={styles.buttonText}>*</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity style={styles.button} onPress={() => onPress('4')}>
						<Text style={styles.buttonText}>4</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('5')}>
						<Text style={styles.buttonText}>5</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('6')}>
						<Text style={styles.buttonText}>6</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('-')}>
						<Text style={styles.buttonText}>-</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity style={styles.button} onPress={() => onPress('1')}>
						<Text style={styles.buttonText}>1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('2')}>
						<Text style={styles.buttonText}>2</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('3')}>
						<Text style={styles.buttonText}>3</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('+')}>
						<Text style={styles.buttonText}>+</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity style={styles.zeroButton} onPress={() => onPress('0')}>
						<Text style={{ ...styles.buttonText }}>0</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('.')}>
						<Text style={styles.buttonText}>.</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => { setResult(evalEquation(expression)); }}
					>
						<Text style={styles.buttonText}>=</Text>
					</TouchableOpacity>
				</View>
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