const int yesButtonPin = 4;
const int noButtonPin = 5;
const int distractButtonPin = 0;
const int buttonPressedThreshold = 512;
boolean distractPressedFlag = false;
boolean yesPressedFlag = false;
boolean noPressedFlag = false;
int count = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(distractButtonPin, INPUT);
  pinMode(yesButtonPin, INPUT);
  pinMode(noButtonPin, INPUT);
  Keyboard.begin();
}                            

void loop() {
  
  count++;
  
  int distractValue = analogRead(distractButtonPin);
  int yesValue = analogRead(yesButtonPin);
  int noValue = analogRead(noButtonPin);
  
  if ( distractValue > buttonPressedThreshold ) {
     distractPressedFlag = true;
  }     
  if ( yesValue > buttonPressedThreshold ) {
    yesPressedFlag = true;
  }
  if ( noValue > buttonPressedThreshold ) {
    noPressedFlag = true;
  }
  
  if ( count > 2500 ) {
    if ( distractPressedFlag ) {
       Serial.println("distract press");
       //Keyboard.print(' ');
       distractPressedFlag = false;
    }
    if ( yesPressedFlag ) {
       Serial.println("yes press");
       //Keyboard.print('y');
       yesPressedFlag = false;
    }
    if ( noPressedFlag ) {
       Serial.println("no press");
       //Keyboard.print('n');
       noPressedFlag = false;
    }
    Keyboard.releaseAll();
    count = 0;
  }
}


