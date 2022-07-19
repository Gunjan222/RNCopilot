import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';

const App = props => {
  const [secondStepActive, setSecondStepActive] = useState(true);
  const WalkthroughableText = walkthroughable(Text);
  const WalkthroughableImage = walkthroughable(Image);

  useEffect(() => {
    props.copilotEvents.on('stepChange', handleStepChange);
    props.start();
  }, []);

  const handleStepChange = step => {
    console.log(`Current tep is: ${step.name}`);
  };
  return (
    <SafeAreaView style={styles.screen}>
      {/* Step 1 */}
      <CopilotStep
        text="This is the heading with some style"
        order={1}
        name="firstUniqueKey">
        <WalkthroughableText style={styles.title}>
          Example of App Introduction Tour in React
        </WalkthroughableText>
      </CopilotStep>

      {/* Step 3 */}
      <CopilotStep text="This is an image" order={3} name="ThirdUniqueKey">
        <WalkthroughableImage
          source={{
            uri: 'https://i.pinimg.com/564x/0e/8f/9e/0e8f9e2cbfe97f6d74147f7521a03b1d.jpg',
          }}
          style={styles.image}
        />
      </CopilotStep>

      {/* Step 2 */}
      <View style={styles.activeSwitchContainer}>
        <CopilotStep
          active={secondStepActive}
          text="this is a simple text without style"
          order={2}
          name="SecondUniqueKey">
          <WalkthroughableText style={{height: 70}}>
            Default text without style that can be skipped after disabling the
            switch
          </WalkthroughableText>
        </CopilotStep>
        <Switch
          onValueChange={secondStepActive =>
            setSecondStepActive(secondStepActive)
          }
          value={secondStepActive}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textColor}>Start the App Intro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default copilot({
  overlay: 'svg', // or 'view'
  animated: true, // or false
})(App);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textColor: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    height: 100,
    textAlign: 'center',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    // marginVertical: 20,
  },
});
