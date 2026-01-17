import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStyles } from './adminHeader.styles';

interface AdminHeaderProps {
  title: string;
  onRightPress?: () => void;
  rightIconName?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onRightPress, rightIconName }) => {
    const styles = createStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {rightIconName && (
        <TouchableOpacity onPress={onRightPress}>
          <Ionicons name={rightIconName} size={24} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AdminHeader;