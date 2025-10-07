import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BarberDocumentsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'رخصة المحل',
      type: 'license',
      date: '2024-01-15',
      status: 'valid',
      expiryDate: '2025-01-15',
      icon: 'document-text'
    },
    {
      id: 2,
      title: 'شهادة الصحة',
      type: 'health',
      date: '2024-02-20',
      status: 'valid',
      expiryDate: '2025-02-20',
      icon: 'medical'
    },
    {
      id: 3,
      title: 'تأمين العمل',
      type: 'insurance',
      date: '2024-03-10',
      status: 'expiring',
      expiryDate: '2024-12-10',
      icon: 'shield-checkmark'
    },
    {
      id: 4,
      title: 'شهادة الحريق',
      type: 'safety',
      date: '2023-06-15',
      status: 'expired',
      expiryDate: '2024-06-15',
      icon: 'flame'
    },
    {
      id: 5,
      title: 'عقد الإيجار',
      type: 'contract',
      date: '2023-01-01',
      status: 'valid',
      expiryDate: '2025-12-31',
      icon: 'home'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'valid': return '#4CAF50';
      case 'expiring': return '#FF9800';
      case 'expired': return '#F44336';
      default: return '#999';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'valid': return 'ساري';
      case 'expiring': return 'ينتهي قريباً';
      case 'expired': return 'منتهي';
      default: return 'غير معروف';
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDocumentCard = (doc) => (
    <TouchableOpacity 
      key={doc.id} 
      style={styles.documentCard}
      onPress={() => navigation.navigate('DocumentDetails', { document: doc })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name={doc.icon} size={30} color="#8B4513" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.documentTitle}>{doc.title}</Text>
          <Text style={styles.documentDate}>تاريخ الإصدار: {doc.date}</Text>
          <Text style={styles.documentExpiry}>تاريخ الانتهاء: {doc.expiryDate}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(doc.status) }]}>
          <Text style={styles.statusText}>{getStatusText(doc.status)}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={20} color="#8B4513" />
          <Text style={styles.actionText}>عرض</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download" size={20} color="#8B4513" />
          <Text style={styles.actionText}>تحميل</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social" size={20} color="#8B4513" />
          <Text style={styles.actionText}>مشاركة</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المستندات والوثائق</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddDocument')}>
          <Ionicons name="add-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="البحث في المستندات..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
          <Text style={[styles.statNumber, { color: '#4CAF50' }]}>3</Text>
          <Text style={styles.statLabel}>سارية</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
          <Text style={[styles.statNumber, { color: '#FF9800' }]}>1</Text>
          <Text style={styles.statLabel}>تنتهي قريباً</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}>
          <Text style={[styles.statNumber, { color: '#F44336' }]}>1</Text>
          <Text style={styles.statLabel}>منتهية</Text>
        </View>
      </View>

      <ScrollView style={styles.documentsList}>
        {filteredDocuments.map(doc => renderDocumentCard(doc))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#8B4513',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    textAlign: 'right',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  documentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'right',
  },
  documentDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  documentExpiry: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFF8DC',
  },
  actionText: {
    marginLeft: 6,
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BarberDocumentsScreen;
