import { View, ScrollView, Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Appbar from "@/components/ui/appBar";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useGetTnc } from "@/services/tnc-pnp/api";
import Loader from "@/components/ui/loader";

export default function Tnc() {
  const router = useRouter();

  const getTnc = useGetTnc();

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Syarat dan Ketentuan"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20, marginTop: 5 }}
        contentContainerStyle={{ width: "100%", paddingBottom: 40 }}
        scrollEnabled={true}
      >
        {!getTnc.isFetching ? (
          <RenderHTML
            systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
            contentWidth={Dimensions.get("screen").width - 48}
            source={{
              html: getTnc.data?.data.desc || "<p>Hello World</p>",
            }}
          />
        ) : (
          <Loader />
        )}
      </ScrollView>
    </View>
  );
}
