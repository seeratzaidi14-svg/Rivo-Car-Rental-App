import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { BottomSheet } from '../bottomSheet/BottomSheet';
import { createStyles } from './date.styles';
import Button from '../button/component';

interface IDateComponentProps {
  visible: boolean;
  setVisible: (e: boolean) => void;
}

const DateComponent = ({ visible, setVisible }: IDateComponentProps) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const styles = createStyles();

  const onDayPress = (day: { dateString: string }) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else {
      if (new Date(day.dateString) < new Date(startDate)) {
        setStartDate(day.dateString);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const getMarkedDates = () => {
    let marked: any = {};

    if (startDate) {
      marked[startDate] = {
        startingDay: true,
        color: '#000',
        textColor: 'white',
      };
    }

    if (endDate) {
      marked[endDate] = {
        endingDay: true,
        color: '#000',
        textColor: 'white',
      };

      let current = new Date(startDate!);

      while (current < new Date(endDate)) {
        const dateStr = format(current, 'yyyy-MM-dd');

        if (dateStr !== startDate) {
          marked[dateStr] = {
            color: '#d3d3d3',
            textColor: 'black',
          };
        }
        current.setDate(current.getDate() + 1);
      }
    }

    return marked;
  };

  return (
    <BottomSheet visible={visible} setVisible={setVisible}>
      <View style={styles.container}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          markingType="period"
        />

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              setStartDate(null);
              setEndDate(null);
              setVisible(false);
            }}
            text="Cancel"
            buttonStyles={styles.outlineBtn}
            textStyles={styles.outlineText}
          />

          <Button
            onPress={() => {
              console.log('SELECTED RANGE:', startDate, endDate);
              setVisible(false);
            }}
            text="Done"
            buttonStyles={styles.btn}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default DateComponent;
