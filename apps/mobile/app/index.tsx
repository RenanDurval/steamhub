import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Interface matching the backend
interface ContentItem {
    id: string;
    title: string;
    providers: string[];
    type: 'movie' | 'series';
}

export default function App() {
    const [data, setData] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real device, replace localhost with your machine's IP
        fetch('http://localhost:3000/stream/catalog')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error('Error fetching data:', err))
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }: { item: ContentItem }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.type.toUpperCase()}</Text>
            <View style={styles.providerContainer}>
                {item.providers.map((p) => (
                    <View key={p} style={styles.tag}>
                        <Text style={styles.tagText}>{p}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>StreamHub</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#e50914" />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#000',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e50914', // Netflix Red-ish
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#1e1e1e',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        color: '#aaa',
        fontSize: 12,
        marginBottom: 8,
    },
    providerContainer: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    tagText: {
        color: '#fff',
        fontSize: 12,
    },
});
