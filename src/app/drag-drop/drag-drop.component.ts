import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Lesson } from '../model/lesson';


@Component({
  selector: 'drag-drop-example',
  templateUrl: "drag-drop.component.html",
  styleUrls: ["drag-drop.component.scss"]
})
export class DragDropComponent {

  lessons = [
    {
      id: 120,
      'description': 'Introduction to Angular Material',
      'duration': '4:17',
      'seqNo': 1,
      courseId: 11
    },
    {
      id: 121,
      'description': 'Navigation and Containers',
      'duration': '6:37',
      'seqNo': 2,
      courseId: 11
    },
    {
      id: 122,
      'description': 'Data Tables',
      'duration': '8:03',
      'seqNo': 3,
      courseId: 11
    },
    {
      id: 123,
      'description': 'Dialogs and Overlays',
      'duration': '11:46',
      'seqNo': 4,
      courseId: 11
    },
    {
      id: 124,
      'description': 'Commonly used Form Controls',
      'duration': '7:17',
      'seqNo': 5,
      courseId: 11
    },
    {
      id: 125,
      'description': 'Drag and Drop',
      'duration': '8:16',
      'seqNo': 6,
      courseId: 11
    },
    {
      id: 126,
      'description': 'Responsive Design',
      'duration': '7:28',
      'seqNo': 7,
      courseId: 11
    },
    {
      id: 127,
      'description': 'Tree Component',
      'duration': '11:09',
      'seqNo': 8,
      courseId: 11
    },
    {
      id: 128,
      'description': 'Virtual Scrolling',
      'duration': '3:44',
      'seqNo': 9,
      courseId: 11
    },
    {
      id: 129,
      'description': 'Custom Themes',
      'duration': '8:55',
      'seqNo': 10,
      courseId: 11
    },
    {
      id: 130,
      'description': 'Changing Theme at Runtime',
      'duration': '12:37',
      'seqNo': 11,
      courseId: 11
    }
  ];

  done = [];

  //! drag and drop di item sullo stesso container
  drop(event: CdkDragDrop<Lesson[]>) {

    const elemento = event.item.element.nativeElement.textContent;
    //console.log(elemento);
    console.log(`previousIndex: '${elemento}' from ${event.previousIndex} to currentIndex: ${event.currentIndex}`);
    // console.log(`currentIndex: ${event.currentIndex}`);

    //! questo metodo modifica l'array delle lessons se non vuoi che
    //! avvenga devi fare una copia.
    moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
  }

  //! drag and drop item da un container a un altro.
  dropMultiList(event: CdkDragDrop<Lesson[]>) {

    if (event.previousContainer === event.container) {
      //! questo metodo modifica l'array delle lessons se non vuoi che
      //! avvenga devi fare una copia.
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }



}
