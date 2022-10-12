import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';



const Calculator = () => {
	const [text, setText] = useState('');
	const onPress = (value) => setText(text + value);

	return (
		<View style={{ padding: 10 }}>
			<TextInput
				style={{ height: 40, boderColor: 'black', borderWidth: 2 }}
				placeholder='Insert equation'
				onChangeText={newText => setText(newText)}
				defaultValue={text}
			/>

			<View style={styles.col}>

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
						onPress={() => setText(text.slice(0, -1))}
					>
						<Text style={styles.buttonText}>Del</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={() => setText('')}>
						<Text style={styles.buttonText}>Clear</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
						onPress={() => setText(eval(text))}
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
		flex: 1,
		padding: 10,
		width: '25%',
	},
	button: {
		width: 50,
		height: 50,
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 15,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
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
});

export default Calculator;