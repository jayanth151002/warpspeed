import React, { useRef } from 'react';
import { Document, Page, Text, View, Image, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { project } from '../constants';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    introduction: {
        fontSize: 14,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        marginBottom: 20,
    },
    layer: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    features: {
        marginBottom: 20,
    },
    feature: {
        fontSize: 14,
        marginBottom: 5,
    },
});

const ProjectPDF: React.FC = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>{project.title}</Text>
                <Text style={styles.introduction}>{project.introduction}</Text>
                <Image style={styles.image} src={project.imgUrl} />
                {project.layers.map((layer: any, index: any) => (
                    <View key={index}>
                        <Text style={styles.layer}>{layer.title}</Text>
                        <View style={styles.features}>
                            {layer.key_features.map((feature: any, i: any) => (
                                <Text key={i} style={styles.feature}>
                                    {feature.feature}: {feature.explanation}
                                </Text>
                            ))}
                        </View>
                    </View>
                ))}
            </Page>
        </Document>
    );
};
export default ProjectPDF;