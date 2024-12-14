import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  FlatList,
  Image,
  Button,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark", // Default to dark mode
};

// Extend the theme
export const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6", // Main emerald color
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
    },
  },
});

// Daftar produk tas gunung
const products = [
  {
    id: "1",
    name: "Jacket TNF",
    description: "Cocok untuk musim dingin dan hiking",
    price: "Rp 3.500.000",
    image: { uri: "https://down-id.img.susercontent.com/file/id-11134207-7quky-li9nohxax17u67@resize_w450_nl.webp" },
  },
  {
    id: "2",
    name: "Baju TNF",
    description: "Desain kokoh dan nyaman untuk traveling",
    price: "Rp 150.000",
    image: { uri: "https://down-id.img.susercontent.com/file/id-11134207-7r992-lx54f9s35fff02@resize_w450_nl.webp" },
  },
  {
    id: "3",
    name: "Celana pendek TNF",
    description: "Cocok untuk nyantai di pantai",
    price: "Rp 100.000",
    image: { uri: "https://down-id.img.susercontent.com/file/sg-11134201-7rfg6-m3af8quq9mbyc1.webp" },
  },
  {
    id: "4",
    name: "Sepatu TNF",
    description: "Cocok untuk pekerjaan lapangan atau hiking",
    price: "Rp 2.500.000",
    image: { uri: "https://down-id.img.susercontent.com/file/id-11134207-7qul5-ligmnlfl5sveb4@resize_w450_nl.webp" },
  },
];

// Stack Navigator
const Stack = createStackNavigator();

// Halaman untuk menampilkan produk
function HomeScreen({ navigation }) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Box
          borderWidth={1}
          borderColor="coolGray.500"
          borderRadius="10"
          bg="gray.800"
          shadow={5}
          p={4}
          m={3}
          _dark={{ bg: "gray.700", borderColor: "gray.600" }}
        >
          <Image
            source={item.image}
            alt={item.name}
            size="2xl"
            borderRadius={10}
            resizeMode="cover"
          />
          <VStack space={2} mt={2}>
            <Text bold fontSize="lg" color="emerald.400">
              {item.name}
            </Text>
            <Text fontSize="sm" color="coolGray.300">
              {item.description}
            </Text>
            <Text bold color="emerald.500" fontSize="lg">
              {item.price}
            </Text>
            <Button
              colorScheme="emerald"
              mt={2}
              onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
            >
              Lihat Detail
            </Button>
          </VStack>
        </Box>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

// Halaman Detail Produk
function ProductDetail({ route, navigation }) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);

  return (
    <VStack space={4} alignItems="center" mt={5} px={4}>
      <Box
        width="100%"
        height={300}
        mb={4}
        borderRadius="12"
        overflow="hidden"
        shadow={5}
        _dark={{ bg: "gray.800" }}
      >
        <Image
          source={product.image}
          alt={product.name}
          height="100%"
          width="100%"
          resizeMode="cover"
        />
      </Box>
      <Text bold fontSize="3xl" color="emerald.400" textAlign="center">
        {product.name}
      </Text>
      <Text mt={2} fontSize="md" color="coolGray.300" textAlign="center">
        {product.description}
      </Text>
      <Text mt={4} color="emerald.500" fontSize="2xl" bold textAlign="center">
        {product.price}
      </Text>
      <Button
        colorScheme="emerald"
        mt={6}
        size="lg"
        onPress={() => navigation.navigate("OrderScreen", { productId: product.id })}
      >
        Beli Sekarang
      </Button>
    </VStack>
  );
}

// Halaman Pemesanan (OrderScreen)
function OrderScreen({ route }) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);

  return (
    <VStack space={4} alignItems="center" mt={5} px={4}>
      <Heading size="lg" color="emerald.400">
        Halaman Pemesanan
      </Heading>
      <Text bold fontSize="xl" color="emerald.300">
        Anda Memilih:
      </Text>
      <Box
        borderWidth={1}
        borderColor="coolGray.500"
        borderRadius="8"
        bg="gray.800"
        shadow={5}
        p={4}
        m={3}
        width="90%"
      >
        <Image
          source={product.image}
          alt={product.name}
          size="xl"
          borderRadius={8}
          resizeMode="cover"
        />
        <Text bold fontSize="lg" color="emerald.400" mt={2}>
          {product.name}
        </Text>
        <Text fontSize="sm" color="coolGray.300" mt={1}>
          {product.description}
        </Text>
        <Text bold color="emerald.500" fontSize="lg" mt={2}>
          {product.price}
        </Text>
      </Box>
      <Button colorScheme="emerald" mt={6} size="lg">
        Lanjutkan Pembayaran
      </Button>
    </VStack>
  );
}

// App Component
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: "TNF STORE", headerStyle: { backgroundColor: "#0d9488" }, headerTintColor: "#fff" }} 
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetail} 
            options={{ title: "Detail Produk", headerStyle: { backgroundColor: "#0d9488" }, headerTintColor: "#fff" }}
          />
          <Stack.Screen 
            name="OrderScreen" 
            component={OrderScreen} 
            options={{ title: "Pemesanan", headerStyle: { backgroundColor: "#0d9488" }, headerTintColor: "#fff" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
