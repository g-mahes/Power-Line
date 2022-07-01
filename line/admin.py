from django.contrib import admin
from .models import Line
# Register your models here.

class ListAdmin(admin.ModelAdmin):
    list_display = ('geometry')
admin.site.register(Line)