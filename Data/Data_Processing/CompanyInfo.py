from wordcloud import WordCloud
import matplotlib.pyplot as plt
import matplotlib
from pytrends.request import TrendReq
import pandas as pd

# keywords는 list형식으로 받아야함
# keywords = ['금융', '제조', '자동차']
def GoogleTrends(keywords):

    pytrends = TrendReq(hl='ko', tz=540)
    pytrends.build_payload(kw_list = keywords, cat=0, timeframe="today 5-y", geo="KR", gprop="")

    def RelatedQueries(keywords):
        data_queries = pytrends.related_queries()
        data_queries = data_queries[keywords[0]]['top']

        for i in range(len(data_queries)):
            data_queries['query'][i] = data_queries['query'][i].replace(" ", "")

        freq = dict(zip(data_queries["query"], data_queries["value"]))
        wordcloud = WordCloud(font_path = "./Fonts/NotoSansKR-Regular.otf", background_color="white")

        word = plt.figure(figsize=(15,10))
        word = plt.imshow(wordcloud.generate_from_frequencies(freq))
        word = plt.axis("off")
        word = plt.savefig('./Data/wordcloud_%s.png' % keywords[0])

        wordcloud = open('./Data/wordcloud_%s.png' % keywords[0])

        return wordcloud

    def InterestOverTime(keywords):
        matplotlib.rcParams['font.family'] = 'Malgun Gothic'
        matplotlib.rcParams['axes.unicode_minus'] = False

        data = pytrends.interest_over_time()

        image = data.plot(title = '관심도%s' % keywords)
        fig = image.get_figure()
        fig.savefig('./Data/graph_%s.png' % keywords)

        graph = open('./Data/graph_%s.png' % keywords)

        return graph

            
