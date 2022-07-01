from django.db import models


class Line (models.Model):

    geometry = models.JSONField(("geometry"))
    wear = models.FloatField(("wear"))
    weather = models.FloatField(("weather"))
    vegetation = models.FloatField(("vegetation"))
