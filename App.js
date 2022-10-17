// https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function evaluateExpression(expression) {
	let result = expression;
	try {
		result = Function(`return (${expression})`)();
		// result = eval(expression);
	}
	catch (error) {
		alert(error.message + `\nPlease re-enter your expression`);
	}
	finally {
		return (Math.round(result * 100) / 100).toString();
	}
};



const Calculator = () => {
	const basicButtons = ['Del', 'C', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

	const [history, setHistory] = useState([]);
	const [expression, setExpression] = useState('0');
	const [result, setResult] = useState('0');

	const evaluateExpression = (expression) => {
		let result = expression;
		try {
			result = Function(`return (${expression})`)();
			// result = eval(expression);
		}
		catch (error) {
			alert(error.message + `\nPlease re-enter your expression`);
		}
		finally {
			return (Math.round(result * 100) / 100).toString();
		}
	};

	const handleButtonPress = (button) => {
		// Only show = when = is pressed
		if (result[0] === '=') {
			setResult(result.slice(1));
		}

		// Handle button presses
		switch (button) {
			case 'Del': {
				setExpression(expression.slice(0, -1));
				break;
			}
			case 'C': {
				setExpression('');
				break;
			}
			case '=': {
				let temp = evaluateExpression(expression);

				// Add to history
				setHistory([...history, { expression: expression, result: temp }]);

				setResult(`=${temp}`);
				setExpression(temp);
				break;
			}
			default: {
				setExpression(expression + button);
				break;
			}
		}
	};

	return (
		<View style={styles.container}>

			{/* main screen */}
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
					basicButtons.map((button) => (
						<TouchableOpacity
							key={button}
							style={button === '0' ? styles.zeroButton : styles.button}
							onPress={() => handleButtonPress(button)}
						>
							<Text style={styles.buttonText}>{button}</Text>
						</TouchableOpacity>
					))
				}
			</View>

			<View>
				{
					history.map((item, index) => (
						<View key={index}>
							<Text style={styles.historyText}>{item.expression} = {item.result}</Text>
						</View>
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
	},
	historyContainer: {
		flex: 1,
		boderColor: 'black',
		borderWidth: 2,
		padding: 10,
	},
	historyText: {
		flex: 1,
		padding: 15,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'right'
	},
	historyCell: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderWidth: 2,
	},

});

export default Calculator;