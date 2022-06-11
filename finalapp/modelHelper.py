import pandas as pd
import datetime
import time
import pickle
import numpy as np

class ModelHelper():
    def __init__(self):
        pass

    def makePredictions(self, county, hoa, city, squarefeet, beds, baths):
        county_Collin = 0
        county_Dallas = 0
        county_Ellis = 0
        county_Hunt = 0
        county_Kaufman = 0
        county_Rockwall = 0
        county_Tarrant = 0

        hoa_type_Mandatory = 0
        hoa_type_None = 0
        hoa_type_Voluntary = 0

        # parse hoa_type
        if (county == "Collin"):
            county_Collin = 1
        elif (county == "Dallas"):
            county_Dallas = 1
        elif (county == "Ellis"):
            county_Ellis = 1
        elif (county == "Hunt"):
            county_Hunt = 1
        elif (county == "Kaufman"):
            county_Kaufman = 1
        elif (county == "Rockwall"):
            county_Rockwall = 1
        elif (county == "Tarrant"):
            county_Tarrant = 1
        else:
            pass

        # parse hoa_type
        if (hoa == "Mandatory"):
            hoa_type_Mandatory = 1
        elif (hoa == "None"):
            hoa_type_None = 1
        elif (hoa == "Voluntary"):
            hoa_type_Voluntary = 1
        else:
            pass

        input_pred = [[county_Collin, county_Dallas, county_Ellis, county_Hunt, county_Kaufman, county_Rockwall, county_Tarrant, hoa_type_Mandatory, hoa_type_None, hoa_type_Voluntary, city, squarefeet, beds, baths]]
        input_df = pd.DataFrame(input_pred, columns=["county_Collin", "county_Dallas", "county_Ellis", "county_Hunt",
       "county_Kaufman", "county_Rockwall", "county_Tarrant",
       "hoa_type_Mandatory", "hoa_type_None", "hoa_type_Voluntary", "city_le",
       "sqft", "beds_total", "bath_total"])

        filename = 'city_le.sav'
        le_load = pickle.load(open(filename, 'rb'))

        input_df["city_le"] = le_load.transform(input_df.city_le)

        filename2 = 'finalized_model_gboption.sav'
        xgb_load = pickle.load(open(filename2, 'rb'))

        X = input_df
        # preds = ada_load.predict_proba(X)
        preds_singular = xgb_load.predict(X)

        return preds_singular[0]
