/*
  iduser: number;
        4.3) Padronização da foto de Não Conformidade: (número 3 acima)
A foto de não conformidade deve seguir o seguinte padrão:
nc_<idexecution>_<idchecklist>_<idquestion>_<contador>.jpeg
exemplo: nc_5_4_23_1.jpeg e nc_5_4_23_2.jpeg
Onde o NC é o identificador da não conformidade da questão, usar tamanho reduzido, não ultrapassar 1mb.

        4.4) Padronização das fotos complementares: (número 4 acima)
As fotos complementares deve seguir o seguinte padrão por checklist:
comp_<idexecution>_<idchecklist>_<contador>.jpeg
exemplo: comp_5_4_1.jpeg e comp_5_4_2.jpeg
Onde o COMP é o identificador de complementar do checklis, usar tamanho reduzido, não ultrapassar 1mb.
*/

export type TChecklistStoragePhoto = {
  executionId: string;
  checklistId: string;
  questionId?: string;
  counter: number;
  photoUri: string;
}

export class ChecklistPhotosStorageRepository {
  public static generateKey(data: TChecklistStoragePhoto): string {
    const array = Object.values(data);
    const prefix = data.questionId ? 'nc' : 'comp';
    return [prefix, ...array].join('_');
  }

  public static saveChecklistPhoto() {

  }
}
