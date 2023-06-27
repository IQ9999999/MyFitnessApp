/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setGoal} from '../features/StepCounter';

export default function GoalSettingScreen() {
  const [inputGoal, setInputGoal] = useState('');
  const dispatch = useDispatch();

  return (
    <View>
      <TextInput
        value={inputGoal}
        onChangeText={setInputGoal}
        placeholder="Enter your goal"
        keyboardType="numeric"
      />
      <Button
        title="Set Goal"
        onPress={() => {
          dispatch(setGoal(Number(inputGoal)));
          setInputGoal(''); // reset input field after setting goal
        }}
      />
    </View>
  );
}
