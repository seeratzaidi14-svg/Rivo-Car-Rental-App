import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { createStyles } from './adminDashboard.button.styles';

interface Props {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  fullWidth?: boolean;
}

const AdminDashboardButton = ({ label, icon, onPress, fullWidth }: Props) => {
  const styles = createStyles(false);
  return (
    <TouchableOpacity style={[styles.button, fullWidth && styles.full]} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AdminDashboardButton;