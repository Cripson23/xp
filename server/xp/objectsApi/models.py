from django.db import models


class Objects(models.Model):
    idObject = models.AutoField('ID объекта', primary_key=True, unique=True)
    nameObject = models.CharField('Наименование объекта', max_length=80, null=False)
    descriptionObject = models.CharField('Описание объекта', max_length=250)
    xObject = models.FloatField('Координата X на карте', null=False)
    yObject = models.FloatField('Координата Y на карте', null=False)

    def __str__(self):
        return self.nameObject

    class Meta:
        verbose_name = 'Объект'
        verbose_name_plural = 'Объекты'
