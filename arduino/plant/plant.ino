#include "DHT.h"

// Constants for soil moisture sensor
const int airValue = 935;
const int waterValue = 681;
int soilMoistureValue = 0;
int soilmoisturepercent = 0;

// Constants and initialization for DHT sensor
#define DHTPIN 2         // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11    // DHT 11
DHT dht(DHTPIN, DHTTYPE);

// LDR sensor pin
const int LDRPin = A2;

void setup() {
  Serial.begin(9600);
  dht.begin(); // Start the DHT sensor
}

void loop() {
  // Read and display soil moisture
  soilMoistureValue = analogRead(A1);  
  soilmoisturepercent = map(soilMoistureValue, airValue, waterValue, 0, 100);

  if (soilmoisturepercent >= 100) {
    Serial.println("Soil Moisture: 100%");
  } else if (soilmoisturepercent <= 0) {
    Serial.println("Soil Moisture: 0%");
  } else {
    Serial.print("Soil Moisture: ");
    Serial.print(soilmoisturepercent);
    Serial.println("%");
  }

  // Read and display temperature and humidity
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println("%");
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println("°C");
  }

  // Read and display light level from LDR
  int lightLevel = analogRead(LDRPin);
  Serial.print("Light Intensity: ");
  Serial.println(lightLevel);

  delay(2000); // Delay before the next reading
}