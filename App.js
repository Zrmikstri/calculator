// https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function evalEquation(equation) {
	let result = '';
	try {
		result = Function(`'use strict'; return (${equation})`)();
	}
	catch (error) {
		alert(error.message + `\nPlease re-enter your equation`);
	}
	finally {
		return result.toString();
	}
};

const Calculator = () => {
	const [text, setText] = useState('');
	const onPress = (value) => setText(text + value);

	return (
		<View style={styles.container}>
			<View style={styles.col}>

				<View style={styles.row}>
					<Text
						style={{ flex: 1, boderColor: 'black', borderWidth: 2, padding: 15, fontSize: 20, fontWeight: 'bold', textAlign: 'right' }}
						accessibilityLabel='Insert your equation here'
					>
						{text}
					</Text>
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
					<TouchableOpacity style={styles.button} onPress={() => onPress('0')}>
						<Text style={styles.buttonText}>0</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('(')}>
						<Text style={styles.buttonText}>(</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress(')')}>
						<Text style={styles.buttonText}>)</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => onPress('/')}>
						<Text style={styles.buttonText}>/</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => { setText(text.slice(0, -1)); }}
					>
						<Text style={styles.buttonText}>Del</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={() => setText('')}>
						<Text style={styles.buttonText}>Clear</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.equalButton}
						onPress={() => { setText(evalEquation(text)); }}
					>
						<Text style={styles.buttonText}>=</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		width: '25%',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	col: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 15,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	equalButton: {
		flex: 2,
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 15,
	}
});

export default Calculator;